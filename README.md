# RSA Algorithm

Heya! This is my implementation and visual representation of the RSA algorithm. It is made for our research competency for mathematics. Where we study different types of prime numbers and how they are used in the modern world.

## What is the RSA algorithm?

The RSA algorithm is one of the most widely used encryption algorithms. It is an asymetric key algorithm and is used to encrypt and decrypt small amounts of sensitive data.

## How does it work?

1. Generate the keys
   We need to generate both a public and a private key. First we pick two large prime numbers, p and q. Then we calculate n by multiplying p and q. Such that n = p \* q.

We choose a third number, e, such that e is coprime with the product phi. Phi is the product of (p - 1) and (q - 1). In other words the greatest common divider of e and (p -1)(q - 1) must equal 1.

Now we calculate a fourth number, d. This number, d, is the modular multilicative inverse of e mod phi. This means that d \* e are congruent to 1 mod phi.

The public key is equal to pair (n, e) and the private key is equal to the pair (d, e).

2. Encrypting the message

To encrypt a message we first need to encode the message into each letter's corresponding unicode numbers (A = 65, B = 66, ...). The result will be a big number eg. HELLO --> 7269767679. The sender now needs to take this number and raise it to the e mod n power. As such we become the ciphertext c = m^e mod n.

3. Decrypting the message

To decrypt the cipertext, the recipient must raise c to the d mod n power. Such that he becomes the original message m = c^d mod n. The recipient must now only decode the string of unicode numbers to their corresponding letters to become the original message.

## Where to use the program

The program is publicly hosted [here](https://wiskunde-oc.netlify.app) and can be viewed and used there. Keep in mind that the program is written in dutch.

## How to use the program

If you wish to use the program on your local machine and make changes to it you can clone this repository and run npm install to install all dependencies. Then run npm run dev to start the local client.

Keep in mind that the program is written in dutch.
