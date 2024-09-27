/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/sol_transfer.json`.
 */
export type SolTransfer = {
  "address": "ASJnMsrKFMabohWooSYUZMkrzyaG5CLMiDBAbjY43uVM",
  "metadata": {
    "name": "solTransfer",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "transferSol",
      "discriminator": [
        78,
        10,
        236,
        247,
        109,
        117,
        21,
        76
      ],
      "accounts": [
        {
          "name": "sender",
          "writable": true,
          "signer": true
        },
        {
          "name": "receiver",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "scheduledTime",
          "type": "i64"
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidTime",
      "msg": "Sheduled time must be in the future."
    }
  ]
};
