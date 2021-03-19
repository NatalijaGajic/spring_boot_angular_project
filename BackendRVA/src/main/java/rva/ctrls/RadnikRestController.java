package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Obrazovanje;
import rva.jpa.Radnik;
import rva.jpa.Sektor;
import rva.repository.ObrazovanjeRepository;
import rva.repository.RadnikRepository;
import rva.repository.SektorRepository;

@Api(tags = {"Radnik CRUD operations"})
@RestController
@CrossOrigin
public class RadnikRestController {

	@Autowired
	private RadnikRepository radnikRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ObrazovanjeRepository obrazovanjeRepository;
	
	@Autowired
	private SektorRepository sektorRepository;
	
	@ApiOperation(value = "Returns collecion of all Radnik")
	@GetMapping("radnici")
	public Collection<Radnik> getRadnici(){
		return radnikRepository.findAll();
	}
	
	@ApiOperation(value = "Returns Radnik with specified value for id forwarded as path variable")
	@GetMapping("radnici/{id}")
	public Radnik getRadnik(@PathVariable("id") Integer id) {
		return radnikRepository.getOne(id);
	}
	
	@ApiOperation(value = "Returns Radnik with specified value for ime forwarded as path variable")
	@GetMapping("radnici/ime/{ime}")
	public Collection<Radnik> getRadnikByIme(@PathVariable("ime") String ime){
		return radnikRepository.findByImeContainingIgnoreCase(ime);
	}
	
	@ApiOperation(value = "Returns Radnik with specified value for prezime forwarded as path variable")
	@GetMapping("radnici/prezime/{prezime}")
	public Collection<Radnik> getRadnikByPrezime(@PathVariable("prezime") String prezime){
		return radnikRepository.findByPrezimeContainingIgnoreCase(prezime);
	}
	
	@ApiOperation(value = "Returns collection of Radnik with specified id for obrazovanje forwarded as path variable")
	@GetMapping("radnici/obrazovanje/{id}")
	public Collection<Radnik> getRadniciByObrazovanje(@PathVariable("id") int id){
		Obrazovanje obrazovanje = obrazovanjeRepository.getOne(id);
		return radnikRepository.findByObrazovanje(obrazovanje);
		
	}
	
	@ApiOperation(value = "Returns collection of Radnik with specified id for sektor forwarded as path variable")
	@GetMapping("radnici/sektor/{id}")
	public Collection<Radnik> getRadniciBySektor(@PathVariable("id") int id){
		Sektor sektor = sektorRepository.getOne(id);
		return radnikRepository.findBySektor(sektor);
	}
	
	@ApiOperation(value = "Adds instance of Radnik to database")
	@PostMapping("radnici")
	public ResponseEntity<Radnik> insertRadnik(@RequestBody Radnik radnik){
		if(!radnikRepository.existsById(radnik.getId())) {
			Radnik r = radnikRepository.save(radnik);
			System.out.println(radnik.getId());
			System.out.println(r.getId());
			if(radnik.getId() == -13) {
				jdbcTemplate.execute("delete from radnik where id="+r.getId());
			}
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value = "Updates instance of Radnik with specified value for id forwarded as path variable")
	@PutMapping("radnici/{id}")
	public ResponseEntity<Radnik> updateRadnik(@RequestBody Radnik radnik,
			@PathVariable("id") Integer id){
		if(!radnikRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		radnik.setId(id);
		radnikRepository.save(radnik);
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	@ApiOperation(value = "Deletes instance of Radnik with specified value for id forwarded as path variable")
	@DeleteMapping("radnici/{id}")
	public ResponseEntity<Radnik> deleteRadnik(@PathVariable("id") Integer id){
		if(!radnikRepository.existsById(id)) {
			return new ResponseEntity<> (HttpStatus.NO_CONTENT);
		}
		radnikRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute("insert into radnik  (id, ime, prezime, broj_lk, obrazovanje, sektor) values(-100,'Natalija', 'Gajic', 138723,-101,-101)");
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
