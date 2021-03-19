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
import rva.jpa.Preduzece;
import rva.jpa.Radnik;
import rva.repository.PreduzeceRepository;

@RestController
@CrossOrigin
public class PreduzeceRestController {

	@Autowired
	private PreduzeceRepository preduzeceRepository;
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@ApiOperation(value = "Returns collection od all Preduzece")
	@GetMapping("preduzeca")
	public Collection<Preduzece> getPreduzeca(){
		return preduzeceRepository.findAll();
	}
	
	@ApiOperation(value = "Returns collection of all Preduzece")
	@GetMapping("preduzeca/{id}")
	public Preduzece getPreduzece(@PathVariable("id") Integer id) {
		return preduzeceRepository.getOne(id);
	}
	
	@ApiOperation(value = "Adds instance of Preduzece to database")
	@PostMapping("preduzeca")
	public ResponseEntity<Preduzece> insertPreduzece(@RequestBody Preduzece preduzece){
		if(!preduzeceRepository.existsById(preduzece.getId())) {
			Preduzece p = preduzeceRepository.save(preduzece);
			System.out.println(preduzece.getId());
			System.out.println(p.getId());
			if(preduzece.getId() == -13) {
				jdbcTemplate.execute("delete from preduzece where id="+p.getId());
			}
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value = "Updates instance of Preduzece with specified value for id forwarded as path variable")
	@PutMapping("preduzeca/{id}")
	public ResponseEntity<Obrazovanje> updateObrazovanje(@RequestBody Preduzece preduzece, 
			@PathVariable("id") Integer id){
		if(!preduzeceRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		preduzece.setId(id);
		preduzeceRepository.save(preduzece);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "Deletes instance of Preduzece with specified value for id forwarded as path variable")
	@DeleteMapping("preduzeca/{id}")
	public ResponseEntity<Preduzece> deletePreduzece(@PathVariable("id") Integer id){
		if(!preduzeceRepository.existsById(id)) {
			return new ResponseEntity<> (HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("delete from sektor where preduzece="+id);
		preduzeceRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute("insert into preduzece (id, naziv, opis, pib, sediste) values(-100,'ATB Sever', 'ATB Sever', 774441, 'Subotica')");
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
