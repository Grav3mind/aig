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
	    case "UserIcon" :
		control = new qx.ui.basic.Image("aiagallery/homepage2.png");
                control.set(
                  {
                    height : 64,
                    width  : 64
                  });
		this.add(control, {row : 1, column : 0});
		break;

	    case "UserName" :
		control = new qx.ui.basic.Label("UserName...");
		this.add(control, {row : 0, column : 0});
		break;
		
		
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
