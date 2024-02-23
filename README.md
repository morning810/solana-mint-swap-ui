<pre>
<h1># Solana Token Creator with Blockist</h1>

<h2>## Select Net</h2>

You can select solana net using dropdown list aligned around right corner.
We recommend choosing devnet. If you choose 'mainnet-beta', you have to pay real crypto.

<h2>## Wallent Connect</h2>

You can use 'select wallet' button to select wallet type and 'connect' button to connect to selected wallet.
We recommend 'Phantom Wallet'.

And then you need to save your secret key as utf8 int array into 'public/secretKey.json'.

<h2>## Creating a Token</h2>

You need to airdrop sol at 'Token Creator' page using 'Airdrop 1' button to deploy your token to devenet and submit transactions.

And then you can create your token with your specific info.
If you input metadata url, you need to match name and symbol to metadata file content.

<h2>## Confirming Token</h2>

You can confirm token with any transaction( ex. transfer )

<h2>## Block List </h2>

You need to fill 2 inputs at 'Block Wallet' page.

First input is 'Wallet Address' to block. so you can fill it with some wallet address of dangerous man.
Second input is 'Token Address' of created token by yourself. so you can fill it with token address just created at 'Token Creator' page and you can get the address at 'https://explorer.solana.com/address'.

<h2>## Upload Token Metadata</h2>

You can upload your metadata for token to online server with some pay at 'Upload Metadata' page.

First, you need to connect devnet using 'Select Network' dropdown list and 'Connect' button.
Second, you need to upload your logo image for token and then you will be received a url of uploaded image.
Third, you need to make a metadata file using image url and other info, and then you can upload the metadata.

example for metadata file content:
  {
    "name": "LONE",
    "symbol": "LE",
    "description": "Celebratory Solflare NFT for the Solflare X launch",
    "seller_fee_basis_points": 0,
    "image": "https://arweave.net/WBtBoITC6MrNTOJhFdaqsLOliglRujbCOQPnG2Z5PY0?ext=png",
    "external_url": "https://solflare.com",
    "attributes": [
      {
        "trait_type": "web",
        "value": "yes"
      },
      {
        "trait_type": "mobile",
        "value": "yes"
    },
    {
        "trait_type": "extension",
        "value": "yes"
      }
    ],
    "collection": {
      "name": "UpdatedByFUNC",
      "family": "Solflare" 
    },
    "properties": {
      "files": [
        {
          "uri": "https://arweave.net/WBtBoITC6MrNTOJhFdaqsLOliglRujbCOQPnG2Z5PY0?ext=png",
          "type": "image/png"
        }
      ]
    }
  }


<h2>## Update Token Metadata</h2>

You can update your token metadata at 'Update Metadata' page.
Here, you need to input token name and symbol according to metadata file content.
And you input a metadata url like following.

example for metadata url. (use only url except 'L%d: ')
L1: https://arweave.net/TmYCb6amwOqGjXDeKcsoLtQM3Q0mCI8rBM59M8AxBW8
L2: https://arweave.net/x8IeSUb240mRDyptwYHgrwck6oSEW4inMqVQXqzM-9E
L3: https://arweave.net/CF8urT2JOZIKi02Z5J7tqhqo80ZxRix3qkn2Q-vmjw0
L4: https://arweave.net/W0wszvJMGpMMcJTgi52kyyyRxzsy22G2rH5bDmi5jN0
L5: https://arweave.net/ROmEMxaNbQkHbE1NSwzaCmUl3cktqic4n7MUBDlgJU4

<h2>## Get Token Metadata</h2>

You can confirm the update of token metadata at 'Token Metadata' page.
Here, you only need to input token address and then you will receive token metadata.

Enjoy your new token!
</pre>

<pre>
- node version: 21.6.2
</pre>