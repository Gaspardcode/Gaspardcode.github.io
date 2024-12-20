<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tool </title>
    <meta name="description" content="This page features mathematicals tools.">
    
    <!--Favicon-->
    <link rel="apple-touch-icon" sizes="180x180" href="assets/img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favi-32-no-bg.png">
    <link rel="manifest" href="assets/img/site.webmanifest">


	<!-- Stylesheets -->
    <link rel="stylesheet" href="https://lunevedy.com/assets/2.0/css/lunevedy.min.css" />
    <link rel="stylesheet" href="../../assets/css/custom.css" />
    <link rel="stylesheet" href="https://colorhunt.co/palette/dcf2f17fc7d93654860f1035" />

	<!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">

    <!-- Devicon links-->
    <!--<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
-->
    <style>
        header .col-text h2 { line-height: 1.8 }
        .col-1 > h3 { line-height: 1.8 } 
        #matrix-input input {
            width: 75px; /* Adjust width as needed */
            text-align: center;
            margin: 5px;
        }
    </style>
    

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L739GS6HS6"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-L739GS6HS6');
    </script>

</head>
<body onload="generateMatrixInput(3)">

    <!-- NAVIGATION -->
    <nav class="theme-dark"><div class="container-menu">
        <a href="#" class="brand">
            <img class ="logo" src="assets/img/logo.png" width="400" height="400" alt="Sample website logo">
        </a>
    
        <div class="container-menu-links" style="font-family: 'Anonymous Pro', monospace;">
    
            <div class="nav-toggle" id="nav-toggle-btn">
                <div class="bar-1"></div>
                <div class="bar-2"></div>
                <div class="bar-3"></div>
            </div>
    
            <ul class="links-wrapper">
                <li>
                    <a href="#">
                        <i class="fas fa-home"></i>
                    </a>
                </li>
			    <li>
                    <a href="portfolio/js/index.html">
                        mini-JS
                    </a>
                </li>
                <li>
                    <a href="portfolio/index.html"> WebDev </a>
                </li>
                <li><a href="contact/index.html"> Contact </a></li>
            </ul>
                </div>
            </div>
        </nav>
    
        <!-- Description of this page -->
        <header class="theme-dark cols-2-half text-center-mobile custom">
    
            <div class="col-2 col-text">
                <div class="badge not-allowed">Tools</div>
                <h2 class="shadow-pop-bl">
                    <i style="color:white; text-align: center;">&lt;/&gt; Matrix Determinant</i>
                </h2>
                <h4 style="color:white">This is text</h4>
            </div>
            <div class="col-2 col-visual">
                <figure>
                    <!--Picture here-->
                </figure>
            </div>
        </header>
    <main >
        <!--Determinant tool-->
       <section class="w-1356px back_black section-selector-4">
            <div class="col-1 w-820px text-center">
                <div class="col-1-badge" style="background-color: white; color: black;">Here</div>
                <div class="cols-1 text-center">
                    <div>                                                                          
                        Please input your matrix.
                            <label for="matrix-size">Matrix Size (n) :</label>
                            <input type="number" id="matrix-size" min="2" max="24" value="3">
                            <div id="matrix-input">
                                <!-- Matrice d'entrée générée dynamiquement -->
                            </div>
                            
                            <button onclick="calculateDeterminant()">Get the result</button>
                            
                            <div id="result"></div>
                    </div>
                </div>
            </div>
        </section>
    
        <!--Javascript-->
        <script src="../assets/js/matrix.js"></script>
    
    </main>

	<footer class="theme-dark text-center-desktop text-center-mobile">
		<h2>Gaspard TORTERAT--SLANDA</h2>
		<h3>Computer science enthusiast</h3>
		<ul class="footer-links">
			<li><a href="#"><i class="fas fa-home"></i></a></li>
			<li><a href="portfolio/index.html">Portfolio</a></li>
            <li><a href="contact/index.html">Contact</a></li>
		</ul>
		<ul class="footer-icons">
			<li><a href="https://www.linkedin.com/in/gaspard-torterat-slanda-393046263/" target="_blank"><i class="fab fa-linkedin"></i></a></li>
			<li><a href="https://github.com/Gaspardcode" target="_blank"><i class="fab fa-github-square"></i></a></li>
		</ul>
		<p class="privacy"><a href="privacy.html">Privacy &amp; Legal</a></p>
	</footer>
    <script src="https://lunevedy.com/assets/js/lunevedy.js"></script>

</body>
</html>

