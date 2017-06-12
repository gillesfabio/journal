// admin layout

export default ({content} = {}) => `
  <html lang="fr">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title> Admin - Journal </title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400, 700" />
      <link rel="stylesheet" href="/css/admin.css" />
    </head>
    <body>
      ${ content }
    </body>
  </html>
`