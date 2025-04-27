const notFound = (req, res, next) => {
	res.status(404).contentType("text/html").send(`
    <!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Not Found</title>
				<style>
				@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
					* {
						margin: 0;
						padding: 0;
						box-sizing: border-box;
					}
					body {
						height: 100vh;
						font-family: "Poppins", sans-serif;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						color: #fff;
						text-shadow: 1px 1px 2px #555;
						background:rgb(212, 50, 129);
					}
					h1 {
						font-size: 3rem;
					}
					p {
						font-size: 2rem;
						margin-top: 1rem;
					}
				</style>
			</head>
      <body>
        <h1>Oops! Page Not Found (404)</h1>
        <p>The page you're looking for at <code>${req.originalUrl}</code> does not exist.</p>
        <p><a href="/api/v1/items">Go to API homepage</a></p>
      </body>
    </html>
  `);
};

export default notFound;
