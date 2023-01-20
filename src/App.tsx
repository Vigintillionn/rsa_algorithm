import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zero } from "big-integer";
import { SyntheticEvent, useRef, useState } from "react";
import { decode, decrypt, encode, encrypt, getKeys } from "./rsa";
import { BigInteger, IKeys } from "./rsatypes";

function App() {
  const keysize = 250;

  const [keys, setKeys] = useState<IKeys>(getKeys(keysize));
  const [message, setMessage] = useState<string>("");
  const [encoded, setEncoded] = useState<BigInteger>();
  const [encrypted, setEncrypted] = useState<BigInteger>();
  const [earlyDecoded, setEarlyDecoded] = useState<string>("");
  const [decrypted, setDecrypted] = useState<BigInteger>();
  const [decoded, setDecoded] = useState<string>();
  const form = useRef(null);

  const runAlgorithm = (e: SyntheticEvent) => {
    e.preventDefault();
    if (message.length < 1) return;
    
    let encodedMessage = encode(message);
    let encryptedMessage = encrypt(encodedMessage, keys.e, keys.n);
    setEncoded(encodedMessage);
    setEncrypted(encryptedMessage); 
    setEarlyDecoded(decode(encryptedMessage));
  }

  const ontgrendel = (e: SyntheticEvent) => {
    e.preventDefault();

    let decryptedMessage = decrypt(encrypted ?? zero, keys.d, keys.n);
    let decodedMessage = decode(decryptedMessage);
    setDecrypted(decryptedMessage);
    setDecoded(decodedMessage);
  }

  return (
    <div className="min-h-screen grid maingrid gap-x-24 text-stone-900 font-main">
      <header className="flex flex-col items-center py-8 mb-4 border-b-2">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">Het RSA Algoritme</h1>
        <p className="text-base lg:text-lg w-full sm:w-3/5 text-center">Dit is een visuele representatie van het RSA algoritme, gemaakt voor onze onderzoekscompetentie Wiskunde.</p>
      </header>

      <section className="encrypt mx-12 sm:mx-24 mt-16 md:mt-0 md:ml-32 md:mr-0">
        <div className="w-full mb-8 md:mb-24 basis-full">
          <form ref={form} className="flex flex-col w-full items-center md:items-start">
            <div className="flex flex-col w-full md:w-full">
              <span className="font-bold text-center md:text-start">Uw Bericht:</span>
              <input onChange={(e) => setMessage(e.target.value)} className="border-2 w-full lg:w-3/5 mb-4 px-4 py-2 rounded-xl border-stone-500" id="message" type="text" />
            </div>
            <button onClick={runAlgorithm} className="bg-blue-400 rounded-3xl px-8 py-4 mb-2 w-full lg:w-3/5 hover:bg-blue-300 transition-all">Versleutel</button>
          </form>
          {
            encoded 
            ? <>
              <p className="w-full break-all text-sm"><strong>Gecodeerd:</strong> <br/> {encoded?.toString()}</p>
              <p className="w-full break-all text-sm"><strong>Versleuteld:</strong> <br/> {encrypted?.toString()}</p>
              <p className="w-full break-all text-sm"><strong>Als we nu decoderen:</strong> <br/> {earlyDecoded}</p>
              <button onClick={ontgrendel} className="bg-blue-400 rounded-3xl px-8 py-4 w-full lg:w-3/5 mt-8 mb-2 hover:bg-blue-300 transition-all">Ontgrendel</button>
            </> : null
          }
          
          {
            decrypted
            ? <>
              <p className="w-full break-all text-sm"><strong>Ontgrendeld:</strong> <br/> {decrypted?.toString()}</p>
              <p className="w-full break-all text-sm"><strong>Gedecodeerd:</strong> <br/> {decoded?.toString()}</p>
              <p className="w-full break-all text-sm"><strong>Correct:</strong> <br/> {decoded === message ? "Ja" : "Nee"}</p>
            </> : null
          }

        </div>
      </section>
      <section className="keys mx-12 sm:mx-24 mb-8 md:mb-0 md:mr-32 md:ml-0">
        <div className="flex justify-between gap-8">
            <h2 className="text-xl font-bold">Sleutels</h2>
            <button className="rounded-3xl px-4 py-2 border-2 border-red-400 text-red-400 hover:bg-red-200 transition-all" onClick={() => setKeys(getKeys(keysize))}>Regenereer</button>
          </div>
          <div className="break-words">
            <p className="w-full break-all text-sm"><strong>Publieke Sleutel:</strong> <br/> {keys?.n.toString()}</p>
            <p className="w-full break-all text-sm"><strong>Privé Sleutel:</strong> <br/> {keys?.d.toString()}</p>
            <p className="w-full break-all text-sm"><strong>E:</strong> <br/> {keys?.e.toString()}</p>
          </div>
      </section>
      <footer className="bg-stone-900 flex items-center justify-center relative">
        <span className="text-lg text-white">Met &#9825; gemaakt door Yarne</span>
        <a href="github.com" className="absolute right-8 text-white text-4xl hover:opacity-50 transition-opacity"><FontAwesomeIcon icon={faGithub} /></a>
      </footer>
    </div>
  )
}

export default App
