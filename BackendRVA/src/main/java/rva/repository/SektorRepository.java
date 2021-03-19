package rva.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Preduzece;
import rva.jpa.Sektor;

public interface SektorRepository extends JpaRepository<Sektor, Integer>{

	Collection<Sektor> findByPreduzece(Preduzece preduzece);
}
