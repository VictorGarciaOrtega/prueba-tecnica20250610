import { Injectable } from "@angular/core";
import { JSEncrypt } from 'jsencrypt';
const publicKey = `
-----BEGIN PUBLIC KEY-----
MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBPVFeyenU26l637JwUZFRd
g5q31pGiMSbFdePiu4jdM+ROoJsfoAnqUZaxS/vMZc1qRFdi5Up16PCiUWClXPX8
91ZEdgaiDV0nzctBoARUD5NwBtMa+wKXCygxkYviI2EWhya1x+siU6zMYl1rB/aG
QU9iF2IzsMQxZiuCHqOKmE9MVZ12H3fbVUMa9zKe3TVAPk6dCI9k21TpygueH8ZY
mcdI8BsfIiFILUx33ymqSgP3E8nJ0vb+1zAJ6P3kGwBITNXy65C5Q5AHbpYosUaf
fAo3BC+wnQ+Z7Aus96T44eAKbNyazHImDuTlsGwZulZ7Nq7audiBj7MqnEVDSd/j
ChF6mGPfIit5jN7+3I366Wq7AmF/xHXu3YWcDFUp38Au8XdyJVF7jqunDmj9FORj
EgyjXlB/IYE7YSCItp8APui+WQ1Wqfu9uJaM5imSenDFalBoFhph8z/uOK5KfsXn
hrGa4VvpXpooBWLMuq3+kDzxHiNT1T+9rdRoV6JCt9POXms04HehItvK6rbJX6SA
bM7AtVIuCcHDQ8/SPdyDoy+J0hhjeO0O8BDJ74T+UNqUxffgrXFJ6MgjOqWDVhfu
Bw2eRkN3eNeYsVh4qoPSjipIA3oP0v/dEeEObZJHXE4BgtsE+Cn2UJDsSlwsFYDU
stQ9/NBCLvHsLqlOyayIuwIDAQAB
-----END PUBLIC KEY-----
`;

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  encodeString(textToEncode: string): string {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const encrypted = encrypt.encrypt(textToEncode);

    if (!encrypted) {
      console.error('Error al encriptar el texto.');
      return ''
    } else {
      return encrypted
    }
  }
}
