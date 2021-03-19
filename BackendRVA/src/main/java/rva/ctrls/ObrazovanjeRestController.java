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

import io.swagger.annotations.ApiOperation;
import rva.jpa.Obrazovanje;
import rva.jpa.Radnik;
import rva.jpa.Sektor;
import rva.repository.ObrazovanjeRepository;

@RestController
@CrossOrigin
public class ObrazovanjeRestController {

	@Autowired
	private ObrazovanjeRepository obrazovanjeRepository;
	
	@Autowired 
	private JdbcTemplate jdbcTemplate;
	
	@ApiOperation(value = "Returns collection of all Sektor")
	@GetMapping("obrazovanja")
	public Collection<Obrazovanje> getObrazovanja() {
		return obrazovanjeRepository.findAll();
	}
	
	@ApiOperation(value = "Returns Sektor with specified value for id forwarded as path variable")
	@GetMapping("obrazovanja/{id}")
	public Obrazovanje getObrazovanje(@PathVariable("id") Integer id) {
		return obrazovanjeRepository.getOne(id);
	}
	
	@ApiOperation(value = "Adds instance of Sektor to database")
	@PostMapping("obrazovanja")
	public ResponseEntity<Obrazovanje> insertObrazovanje(@RequestBody Obrazovanje obrazovanje){
		if(!obrazovanjeRepository.existsById(obrazovanje.getId())) {
			Obrazovanje o = obrazovanjeRepository.save(obrazovanje);
			System.out.println(obrazovanje.getId());
			System.out.println(o.getId());
			if(obrazovanje.getId() == -13) {
				jdbcTemplate.execute("delete from obrazovanje where id="+o.getId());
			}
			
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value = "Updates instance of Sektor with specified value for id forwarded as path variable")
	@PutMapping("obrazovanja/{id}")
	public ResponseEntity<Obrazovanje> updateObrazovanje(@RequestBody Obrazovanje obrazovanje, @PathVariable("id") Integer id){
		if(!obrazovanjeRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		obrazovanje.setId(id);
		obrazovanjeRepository.save(obrazovanje);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Deletes instance of Obrazovanje with specified value for id forwarded as path variable")
	@DeleteMapping("obrazovanja/{id}")
	public ResponseEntity<Obrazovanje> deleteObrazovanje(@PathVariable("id") Integer id){
		if(!obrazovanjeRepository.existsById(id)) {
			return new ResponseEntity<> (HttpStatus.NO_CONTENT);
		}
		obrazovanjeRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute("insert into obrazovanje (id, naziv, stepen_strucne_spreme, opis)\r\n" + 
					"values(-100, 'Majstorsko i specijalisticko obrazovanje ', '5. stepen', 'Visokokvalifikovani (VKV) radnik')");
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
