/**
 * Copyright (c) 2012 Derrell Lipman
 * 
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html 
 *   EPL : http://www.eclipse.org/org/documents/epl-v10.php
 */

qx.Class.define("aiagallery.widget.mystuff.Detail",
{
  extend : qx.ui.container.Composite,

  construct : function(fsm)
  {
    var             o;
    var             hBox;
    var             form;
    var             formRendered;
    var             categoryList;
    var             currentTags;
    var             tempContainer;
    var             required;

    this.base(arguments);

    // Save the finite state machine reference
    this.__fsm = fsm;

    // Retrieve the list of categories, at least one of which must be selected
    categoryList =
      qx.core.Init.getApplication().getRoot().getUserData("categories");

    // Use the canvas layout for ourself (which will contain only the hBox)
    this.setLayout(new qx.ui.layout.Canvas());

    // Create a HBox which will be the container for the form
    hBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
    this.add(hBox, { edge : 20 });

    // Text to add to buttons (which don't provide the 'required' property) to
    // indicate that they are required.
    required = " <span style='color:red'>*</span> ";

    // Create a form
    form = new qx.ui.form.Form();
    
    //
    // Add the fields
    //
    
    // Title
    o = new qx.ui.form.TextField();
    o.set(
      {
        required    : true,
        placeholder : "Enter the application title"
      });
    form.add(o, "Title", null, "title", null,
             { row : 0, column : 0, colSpan : 6 });
    fsm.addObject("txt_title", o);

    // Description
    o = new qx.ui.form.TextArea();
    o.set(
      {
        width       : 200,
        height      : 60,
        required    : true,
        placeholder : "Enter a brief description"
      });
    form.add(o, "Description", null, "description", null,
             { row : 1, column : 0, colSpan : 6, rowSpan : 2 });
    fsm.addObject("txt_description", o);

    // Create a temporary container for a spacer, a label, and a spacer
    tempContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox());
    
    // Add the left spacer
    tempContainer.add(new qx.ui.core.Spacer(), { flex : 1 });

    // Button to add a tag
    o = new qx.ui.basic.Label("Tags :");
    tempContainer.add(o);

    // Add the right spacer
    tempContainer.add(new qx.ui.core.Spacer(), { flex : 1 });

    form.addButton(tempContainer, { row : 3, column : 2, colSpan : 4 });

    // Create a multi-selection list and add the categories to it.
    o = new qx.ui.form.List();
    o.set(
      {
        height        : 100,
        selectionMode : "multi",
        required      : true
      });
    categoryList.forEach(
      function(tagName) 
      {
        var item = new qx.ui.form.ListItem(tagName);
        o.add(item);
      });
    form.add(o, "Categories", null, "categories", null,
             { row : 3, column : 0, rowSpan : 5 });
    fsm.addObject("lst_categories", o);
    
    // Tag to add
    o = new qx.ui.form.TextField();
    o.set(
      {
        placeholder : "Enter a new tag"
      });
    form.add(o, "", null, null, null,
             { row : 4, column : 2 });
    fsm.addObject("txt_newTag", o);


    // Button to add a tag
    o = new qx.ui.form.Button("Add");
    o.set(
      {
        height    : 24,
        maxHeight : 24
      });
    form.addButton(o, { row : 5, column : 3 });
    fsm.addObject("but_addTag", o);

    // Button to delete selected tag(s)
    o = new qx.ui.form.Button("Delete");
    o.set(
      {
        height    : 24,
        maxHeight : 24
      });
    form.addButton(o, { row : 7, column : 5 });
    fsm.addObject("but_deleteTag", o);

    // Application-specific tags
    o = new qx.ui.form.List();
    o.set(
      {
        height        : 100,
        selectionMode : "multi",
        required      : false
      });
    form.add(o, "", null, "tags", null,
             { row : 4, column : 4, rowSpan : 3 });
    fsm.addObject("lst_tags", o);
    

    // Change file name
    o = new qx.ui.form.Button("Select Source File" + required);
    o.getChildControl("label").setRich(true);
    form.addButton(o, { row : 0, column : 6 });
    fsm.addObject("but_selectSourceFile", o);
    
    // Source file name
    o = new qx.ui.basic.Label();
    form.addButton(o, { row : 1, column : 6 });
    fsm.addObject("lbl_sourceFileName", o);
    
    // Select image
    o = new qx.ui.form.Button("Select Image" + required);
    o.getChildControl("label").setRich(true);
    form.addButton(o, { row : 3, column : 6 });
    fsm.addObject("but_selectImage", o);
    
    // Image1
    o = new qx.ui.basic.Image();
    o.set(
      {
        scale     : true
      });
    form.addButton(o, { row : 4, column : 6, rowSpan : 4 });
    fsm.addObject("img_image1", o);

    //
    // Add the buttons at the end
    //
    
    // Save
    o = new qx.ui.form.Button("Save");
    form.addButton(o);
    fsm.addObject("but_saveApp", o);
    
    // Publish
    o = new qx.ui.form.Button("Publish");
    form.addButton(o);
    fsm.addObject("but_publishApp", o);
    
    // Delete
    o = new qx.ui.form.Button("Delete");
    form.addButton(o);
    fsm.addObject("but_deleteApp", o);

    // Create the rendered form and add it to the HBox
    formRendered = new aiagallery.widget.mystuff.DetailRenderer(form);
    hBox.add(formRendered);
  },
  
  properties :
  {
    title :
    {
      check : "String",
      apply : "_applyTitle"
    },

    description :
    {
      check : "String",
      apply : "_applyDescription"
    },
    
    tags :
    {
      check : "Array",
      apply : "_applyTags"
    },
    
    sourceFileName :
    {
      check : "String",
      apply : "_applySourceFileName"
    },
    
    image1 :
    {
      check : "String",
      apply : "_applyImage1"
    }
  },

  members :
  {
    _applyTitle : function(value, old)
    {
      this.__fsm.getObject("txt_title").setValue(value);
    },
    
    _applyDescription : function(value, old)
    {
      this.__fsm.getObject("txt_description").setValue(value);
    },
    
    _applyTags : function(value, old)
    {
      var             categoryList;
      var             lst_category = this.__fsm.getObject("lst_categories");

/*
      // Retrieve the list of categories
      categoryList =
        qx.core.Init.getApplication().getRoot().getUserData("categories");

      // For each tag...
      value.forEach(
        function(tagName)
        {
        });
          // Is this a current tag of the app being edited?
          if (qx.lang.Array.contains(currentTags, tagName))
          {
            // Yup. Select it.
            categories.addToSelection(item);
          }
*/      
    },
    
    _applySourceFileName : function(value, old)
    {
      this.__fsm.getObject("lbl_sourceFileName").setValue(value);
    },

    _applyImage1 : function(value, old)
    {
      this.__fsm.getObject("img_image1").setSource(value);
    }
  }
});
