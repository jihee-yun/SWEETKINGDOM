package com.kh.finalProject.controller;

import com.kh.finalProject.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/mail")
public class MailController {

    private final MailService mailService;

    @PostMapping("/confirm")
    public ResponseEntity<Boolean> mailConfirm(@RequestBody Map<String, String> mailData) {
        String mail = mailData.get("mail");
        boolean result = mailService.confirm(mail);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/verify")
    public ResponseEntity<Boolean> verifyCode(@RequestBody Map<String, String> verifyData) {
        String mail = verifyData.get("mail");
        String code = verifyData.get("code");
        boolean result = mailService.verifyCode(mail, code);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
