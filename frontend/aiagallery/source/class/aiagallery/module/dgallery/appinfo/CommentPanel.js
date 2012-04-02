qx.Class.define("aiagallery.module.dgallery.appinfo.CommentPanel",
{
  extend : collapsablepanel.Panel,
    
    construct : function(fsm)
    {
	this.__fsm = fsm;
	
	// Construct a collapsablepanel.Panel
	this.base(arguments);
	
	// Construct the panel collapsed
        this.set({value : false});

	this.getChildControl("bar");
	
    },


  properties :
  {
      label :
      {
	  check : "String",
	  apply : "_applyLabel"
      }
  
  },

  members :
  {
      __fms : null,

      _createChildControlImpl : function(id)
      {
	  var control;
	  
	  switch(id)
	  {
	  case "bar":
	      control = new aiagallery.module.dgallery.appinfo.CollapsedSummary(this.__fsm, this);
	      control.addListener("click", this.expand, this);
	      
	      if (this._hasChildren())
	      {
		  this._removeAt(this.indexOf("newBar"));
	      };

	      this._addAt(control, 0, {flex : 1});
              break;

	  case "container" :
	      this.base(arguments, id);
	      break;

	  case "newBar" :
	      control = new aiagallery.module.dgallery.appinfo.ExpandedSummaryLTE(this.__fsm, this);
	      control.addListener("click", this.collapse, this);
	      
	      if(this._hasChildren())
	      {
		  this._removeAt(this.indexOf("bar"));
	      };
	 
	      this._addAt(control, 0, {flex : 1});
	      break;

	  }
	  
	  return control || this.base(arguments, id);
	  
      },

      expand : function ()
      {
	  this.getChildControl("newBar");
	  this.toggleValue(this);
      },

      collapse : function() 
      {
	  this.getChildControl("bar");
	  this.toggleValue(this);
      },
      _applyLabel : function(value, old)
      {
	  this.getChildControl("");
      }
  }
      
});
