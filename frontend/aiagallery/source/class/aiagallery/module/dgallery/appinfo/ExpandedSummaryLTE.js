qx.Class.define("aiagallery.module.dgallery.appinfo.ExpandedSummaryLTE", 
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
	this.getChildControl("FullText");
	this.getChildControl("InteractionInterface");
    },

    properties :
    {
	icon :
	{
	    themeable : true
	},

	UserIcon : 
	{
	    check : "String",
	    apply : "_applyUserIcon",
	    nullable : true,
	    themeable : true
	},
	
	UserName : 
	{
	    check : "String", 
	    apply : "_applyUserName"
	},
	
	InteractionInterface :
	{
	    apply : "_applyInteractionInterface"
	},

	FullText : 
	{
	    check : "String",
	    apply : "_applyFullText"
	}
    },
    
    members:
    {
	_createChildControlImpl : function(id, hash)
	{
	    var control
	    var width;

	    switch(id)
	    {

		/*TODO: Link this to the backend to get a real icon.
		  TODO: Change the default icon to something nicer, like a silohuete.
		  */
	    case "UserIcon" :
		control = new qx.ui.basic.Image("aiagallery/homepage2.png");
		control.set(
		{
		    height: 128,
		    width : 128
		});	
		this.add(control, {row : 1, column : 0});
		break;



		/*TODO: Link this in and get a real user name.
		  */
	    case "UserName" :
		control = new qx.ui.basic.Label("User Name");
		this.add(control, {row : 0, column : 0});
		break;
		


		/*TODO: Make all of these buttons do stuff.
		  TODO: Size all of these buttons properly.
		  TODO: Make the appearence more awesome.
		  */		  
	    case "InteractionInterface" :
		likeItButton = new qx.ui.form.Button("Like it");
		flagItButton = new qx.ui.form.Button("Flag it");
		replyButton = new qx.ui.form.Button("Reply");
		expandAllButton = new qx.ui.form.Button("Expand All");
		
		gridLayout = new qx.ui.layout.Grid(4, 4);
		buttonComposite = new qx.ui.container.Composite();

		buttonComposite.setLayout(gridLayout);		

		buttonComposite._add(likeItButton, { row : 0, column : 0});
		buttonComposite._add(flagItButton, { row : 0, column : 1});
		buttonComposite._add(replyButton,  { row : 0, column : 2});
		buttonComposite._add(expandAllButton, { row : 0, column : 3});

		this._add(buttonComposite, {row : 1, column : 1});
		

		/*TODO: Link this into the backend for getting the real actual comment.
		  TODO: Maybe make it a bit prettier.
		  TODO: This is throwing an error that a label already exists at where I am trying to put this.
		  I can't quite figure this one out yet.
		  */
	    case "FullText" : 
		control = new qx.ui.basic.Label
		(
		    "//MYzJVFlTQPeDvitrsmAA0QR6s4BRA2jNAHpLgOGk3il4vAC46SdF+AdyszlwUXpRb7ThsqGxjh3NO8SnZbMHLepyLS4+hkXyyA6Buj8AItvEmyqsW/UVrNlFADsFTL/wV7/+z1dGjx79MIzDdNA00IOyHlAZ4H4NA9yrYQCtGUBvCVBXBEai31RVN1IFXwTP4c96/12E36IMUO7Bz+zga0V9da3zhks8wTt+/G+8TcrVgxaEHxkTzn8uCKZx/wBT76DxNcCuhDV7OyRovr/53X/9ZsKECY/Dfc8AIfSHQN+T4YsGeEBnBtBbAhxF/zcCXzHAKB34Y7Xg43m4CB6TOKzbxah31nCJX8N26MxtW+VSzfhBS0xsFP9aGHbfQGSbfLuUv/utXl4P5WuW9wdz1v/+v3/75uTJ982E+8TdOEzWHpFlFP4UHfh6U79e5I/Tga+37muVf16ubuTpw5/9zhMAv1kZwMNHcvljTAr82rpqm6h31HCJRik8e4bt3L2dgzZy0ILCz+P34kGN/4Z1pt4PZ9WaFa1LfRbnzv/QO/h/3vjDXx6e8dCzcF+Pgf5Jhi6Cn9HPqJ+sE/WT+rnmj9FZ88VdwH7t5GpO++/NeudxgN+kDCa+w5XYnlVUUmCJet5wqdF3x/vlzhdb3m7V0UELKmIzG"
		);
		this._add(control, {row : 3, column : 0, colSpan : 2});
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

	_applyInteractionInterface : function(value, old)
	{
	    this.getChildControl("InteractionInterface").setSource(value);
	},

	_applyFullText : function(value, old)
	{
	    this.getChildControl("FullText").setSource(value);
	}
    }
});
