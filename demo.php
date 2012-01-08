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
          <div class="teaser"><p><strong>This is CSS3Grid.</strong></p></div>
          <div class="content"><h1>This is the content!</h1>More content can be displayed here!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>You can mix any type of content...</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>...with different sizes<br/> and they are layouted<br />automatically by<br />the browsers layout<br />engine.</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><img src="http://www.nemetschek.com/uploads/media/iStock_000003205700XSmall_01.jpg" /></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>


        <div class="cell">
          <div class="teaser"><img src="http://www.mediafaxfoto.ro/FolderComun//Cms/PaginiSite/19/stock-c1.gif" /></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><img src="http://www.mediafaxfoto.ro/FolderComun//Cms/PaginiSite/19/stock-c4.gif" /></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>Click me to see some code</p></div>
          <div class="content">Adding a new cell is as simple as adding this code to your html:<br /><br /><code><?php echo nl2br(htmlentities('<div class="cell">' . "\n" . '  <div class="teaser">The small cell</div>' . "\n" . '  <div class="content">The big cell</div>' . "\n" . '</div>')); ?></code></div>
        </div>
        <div class="cell">
          <div class="teaser"><p>Additional</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>

        <div class="cell">
          <div class="teaser"><p>cells</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>to demonstrate</p></div>
          <div class="content"><h1>Hallo!</h1>Viel mehr content!</div>
        </div>
        <div class="cell">
          <div class="teaser"><p>how cool </p></div>
          <div class="content"><object width="560" height="315"><param name="movie" value="http://www.youtube.com/v/RGJkloHH1EI?version=3&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/RGJkloHH1EI?version=3&amp;hl=en_US" type="application/x-shockwave-flash" width="560" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object></div>
        </div>
        <div class="cell">
          <div class="teaser"><p>css3grid is</p></div>
          <div class="content"><img src="http://www.idahostockimages.com/images/stock1.jpg" /></div>
        </div>


        <div class="css3grid-clear"></div>
      </div>
      
    </div>



  </body>
</html>