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
import rva.jpa.Preduzece;
import rva.jpa.Radnik;
import rva.jpa.Sektor;
import rva.repository.PreduzeceRepository;
import rva.repository.SektorRepository;

@RestController
@CrossOrigin
public class SektorRestController {

	@Autowired
	private SektorRepository sektorRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private PreduzeceRepository preduzeceRepository;
	
	@ApiOperation(value = "Returns collection of all Sektor")
	@GetMapping("sektori")
	public Collection<Sektor> getSektori(){
		return sektorRepository.findAll();
	}
	
	@ApiOperation(value = "Returns Sektor with specified value for id forwarded as path variable")
	@GetMapping("sektori/{id}")
	public Sektor getSektor(@PathVariable("id") Integer id) {
		return sektorRepository.getOne(id);
	}
	
	@ApiOperation(value = "Returns collection of Sektor with specified id for preduzece forwarded as path variable")
	@GetMapping("sektori/preduzece/{id}")
	public Collection<Sektor> getSektoriByPreduzece(@PathVariable("id") int id){
		Preduzece preduzece = preduzeceRepository.getOne(id);
		return sektorRepository.findByPreduzece(preduzece);
	}
	
	@ApiOperation(value = "Adds instance of Sektor to database")
	@PostMapping("sektori")
	public ResponseEntity<Sektor> insertSektor(@RequestBody Sektor sektor){
		if(!sektorRepository.existsById(sektor.getId())) {
			Sektor s = sektorRepository.save(sektor);
			System.out.println(sektor.getId());
			System.out.println(s.getId());
			if(sektor.getId() == -13) {
				jdbcTemplate.execute("delete from sektor where id="+s.getId());
			}
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value = "Updates instance of Sektor with specified value for id forwarded as path variable")
	@PutMapping("sektori/{id}")
	public ResponseEntity<Sektor> updateSektor(@RequestBody Sektor sektor,
			@PathVariable("id") Integer id){
		if(!sektorRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		sektor.setId(id);
		sektorRepository.save(sektor);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Deletes instance of Sektor with specified value for id forwarded as path variable")
	@DeleteMapping("sektori/{id}")
	public ResponseEntity<Sektor> deleteSektor(@PathVariable("id") Integer id){
		if(!sektorRepository.existsById(id)) {
			return new ResponseEntity<> (HttpStatus.NO_CONTENT);
		}
		sektorRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute("insert into sektor (id, naziv, oznaka, preduzece) values(-100,'Sektor IT','SITSDDITC', -101)");
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
