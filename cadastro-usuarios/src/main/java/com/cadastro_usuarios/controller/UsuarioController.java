package com.cadastro_usuarios.controller;

import com.cadastro_usuarios.model.Usuario;
import com.cadastro_usuarios.repository.UsuarioRepository;
import com.cadastro_usuarios.service.ViaCepService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UsuarioController {
    private final UsuarioRepository repository;
    private final ViaCepService viaCepService;

    public UsuarioController(UsuarioRepository repository, ViaCepService viaCepService) {
        this.repository = repository;
        this.viaCepService = viaCepService;
    }

    @GetMapping("/enderecos/cep/{cep}")
    public Map<String, Object> consultarCep(@PathVariable String cep) {
        return viaCepService.consultar(cep);
    }

    @PostMapping("/usuarios")
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario criar(@Valid @RequestBody Usuario usuario) {
        return repository.save(usuario);
    }

    @GetMapping("/usuarios")
    public List<Usuario> listar() {
        return repository.findAll();
    }
}
