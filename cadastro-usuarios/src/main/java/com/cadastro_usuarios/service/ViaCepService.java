package com.cadastro_usuarios.service;

import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class ViaCepService {
    private final RestClient client = RestClient.builder().baseUrl("https://viacep.com.br/ws").build();

    public Map<String, Object> consultar(String cep) {
        String numero = cep.replaceAll("\\D", "");
        if (!numero.matches("\\d{8}"))
            throw new ResponseStatusException(HttpStatusCode.valueOf(400), "CEP deve conter 8 dígitos");
        Map<String, Object> resposta = client.get().uri("/{cep}/json/", numero).retrieve().body(Map.class);
        if (resposta == null || Boolean.TRUE.equals(resposta.get("erro")))
            throw new ResponseStatusException(HttpStatusCode.valueOf(404), "CEP não encontrado");
        return resposta;
    }
}
