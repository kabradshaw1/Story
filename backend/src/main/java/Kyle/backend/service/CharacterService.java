package Kyle.backend.service;

import org.springframework.beans.factory.annotation.Autowired;

import Kyle.backend.dao.CharacterRepository;
import Kyle.backend.entity.Character;

public class CharacterService {

  @Autowired
  private CharacterRepository characterRepository;

  public Character findByName(String name) {
    return null;

  }
}
