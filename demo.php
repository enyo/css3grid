<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>CSS3Grid Tests</title>

    <script type="text/javascript" src="lib/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="lib/underscore-1.2.3.js"></script>
    <script type="text/javascript" src="css3grid.js"></script>

    <style type="text/css">

      @import "css3grid.css";

      html {
        background: #888;
      }
      body {
        background: #aaa;
        background: -webkit-radial-gradient(center, circle contain, #bbb, #888) center center no-repeat;
        font-family: arial, tahoma, sans-serif;
        font-size: 13px;
        padding: 50px;
      }
      .css3grid {
        margin: 50px auto;
      }
    </style>

  </head>
  <body>

    <div class="css3grid loading">
      <div class="loading">Loading</div>

      <div class="cells">

        <div class="cell">
          <div class="teaser"><p>Bla bla content</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>Bla bla content more<br />content</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>Bla bla content yoyoyo<br />Yo ho bo</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>Bla bla content</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>


        <div class="cell">
          <div class="teaser"><p>Bla bla content</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>Bla bla content</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>Bla bla content</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>Bla bla content</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>

        <div class="cell">
          <div class="teaser"><p>Bla bla content</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>Bla bla content</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>Bla bla content</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>Bla bla content</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>


        <div class="css3grid-clear"></div>
      </div>
      
    </div>



  </body>
</html>