// default layout

module.exports = ({content} = {}) => `
  <html lang="fr">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title> Journal </title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="description" content="Journal photographique de Claire" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400, 700" />
      <link rel="stylesheet" href="/css/journal.css" />
      <link rel="manifest" href="/manifest.json" />
    </head>
    <body>
      ${ content }

      <script>
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js?v1')
        }
      </script>
    </body>
  </html>
`