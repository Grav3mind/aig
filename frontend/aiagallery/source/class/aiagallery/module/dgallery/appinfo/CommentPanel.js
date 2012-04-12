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
	  
	        expanded = new aiagallery.module.dgallery.appinfo.ExpandedSummaryLTE(this.__fsm, this);
          // expanded.addListener("click", this.collapse, this);
      
          // create stack container
	        var stack = new qx.ui.container.Stack();
         
          //collapsed = new aiagallery.module.dgallery.appinfo.CollapsedSummary(this.__fsm, this);
	        //collapsed.addListener("click", this.expand(stack), this);
	        
         
          //stack.add (collapsed);
          stack.add (expanded);
            
          stack.setSelection ([stack.getChildren()[0]]);  

	        this._add(stack, {flex : 1});
          	        
	        break;

	      case "container" :

          this.base(arguments, id);
          break;

	      case "newBar" :
          
	      
          this._add(control, {flex : 1});
          break;

      }
	  
      return control || this.base(arguments, id);
	  
    },

    expand : function (stack)
    { 
      this.getChildControl ("bar").setSelection ([stack.getChildren()[1]]);
	    //this.toggleValue(this);
    },


    collapse : function (stack) 
    {
      this.getChildControl ("bar").setSelection ([stack.getChildren()[0]]);
	    //this.toggleValue(this);
    },


    _applyLabel : function(value, old)
    {
      this.getChildControl("");
    }
  }
});
