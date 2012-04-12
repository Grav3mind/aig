qx.Class.define("aiagallery.module.dgallery.appinfo.CollapsedSummary", 
{
  extend : qx.ui.container.Composite,

  construct : function()
  {
    var layout;
	
	  this.base(arguments);
	
	  // Set the layout to a grid
	  layout = new qx.ui.layout.Grid(4, 4);
	  this.setLayout(layout);

	  // Add children
	  this.getChildControl("UserIcon");
	  this.getChildControl("UserName");
	  this.getChildControl("TextPreview");
  },

    properties :
    {

	    UserIcon : 
	    {
	      check : "String",
	      apply : "_applyUserIcon",
	      nullable : true,
	      themeable : true
	    },
	
	    icon :
	    {
	      themeable : true
	    },

	    UserName : 
	    {
	      check : "String", 
	      apply : "_applyUserName"
	    },
	
	    TextPreview : 
	    {
	      check : "String",
	      apply : "_applyTextPreview"
	    }
    },
    
    members:
    {
	    _createChildControlImpl : function(id, hash)
	    {
	      var control;
	      var width;

	      switch(id)
	      {

		
		      /*TODO: Link this up so that we actually get the real user's icon/
		        TODO: Change the default icon to a sillohuete.
		      */

	        case "UserIcon" :
		        control = new qx.ui.basic.Image("/aiagallery/homepage2.png");
            control.set(
            {
              height : 64,
              width  : 64
            });
		
		      this.add(control, {row : 1, column : 0});
		
			    break;

	        
	        /*TODO: Link the user name into the backend so that we get a real user name.
		      */ 
	   
	        case "UserName" :
		        control = new qx.ui.basic.Label("UserName...");
		        this.add(control, {row : 0, column : 0});
		        
		        break;
		
		
		    /*TODO: Figure out how to implement this child in such a way that it displays
		      only a portion of its argument, probably 61 or 125 characters, and appending
		      on an elipse "...".

		      TODO: Make it so that the text displayed in the label is displayed near the bottom
		      rather than near the top.
		     
		      TODO: Add a border around the label so that it looks more like the rest of the site.
		      Wait until I merge with the new site before worrying about this.
		    */
	     
	        case "TextPreview" : 
		        control = new qx.ui.basic.Label("Preview text of user Lorem Ipsum................................");
		        control.setTextAlign("right");
		        control.set(
		        {
		          allowGrowX : true,
		          rich : true
		        });
		      
		        this.add(control, {row : 1, column : 2, rowSpan : 2});
		
		        break;
	      }

	      return control || this.base(arguments, id);
	    
	    },
	
	    _applyUserIcon : function(value, old)
	    {
	      this.getChildControl("UserIcon").setSource(value);
	    },

	    _applyUserName : function(value, old)
	    {
	      this.getChildControl("UserName").setSource(value);
	    },

	    _applyTextPreview : function(value, old)
	    {
	      this.getChildControl("TextPreview").serSource(value);
	    }
    }
});
