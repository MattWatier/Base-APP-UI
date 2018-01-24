$(function() {
  $(document).foundation();


});
  $(function() {
    $( "#slider" ).slider({
      value:100,
      min: 0,
      max: 500,
      step: 50,
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.value );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );
  });
    $(function() {
    $( "#datepicker" ).datepicker();
  });
  $(function() {
   $( "#spinner" ).spinner();
 });
  $(document).ready(function() {
    // http://anovi.github.io/selectonic/
    $("#ButtonGroup").selectonic(
      {
              multi:false,
      mouseMode: "standard",
        keyboard: false,
        focusBlur: true,
        keyboardMode:"toggle",
        focusOnHover:true,
      }
    );
    $("#Toggle").selectonic(
      {
              multi:false,
      mouseMode: "standard",
        keyboard: false,
        focusBlur: true,
        keyboardMode:"toggle",
        focusOnHover:true,
      }
    );
    var $holder = $("#PanelSelector"),panels = $holder.find('.panel-selector'), parent_panel = $holder.find('.parent ul'), child_panel = $holder.find('.child ul');
    parent_panel.selectonic({
      multi:false,
      mouseMode: "standard",
        keyboard: true,
        focusBlur: true,
        keyboardMode:"toggle",
        focusOnHover:true,
        create:function(){
           this.selectonic('disable')
        },
        unselect:function(event,ui){

        },  
        select: function(event, ui) {

        },
    });
    parent_panel.mouseenter(function(){
        parent_panel.selectonic('enable');
       
    });
    parent_panel.mouseleave(function(){
        parent_panel.selectonic('disable');
    });
    child_panel.selectonic({
        multi:false,
        mouseMode: "standard",
        keyboard: true,
        focusBlur: true,
        keyboardMode:"toggle",
        focusOnHover:true,
        create:function(){
            this.selectonic('disable')
        },
        unselect:function(event,ui){

        },  
        select: function(event, ui) {

        },
    });
    child_panel.mouseenter(function(){
        child_panel.selectonic('enable');
        
    });
    child_panel.mouseleave(function(){
        child_panel.selectonic('disable');
    });
    panels.mouseenter(function(){
        panels.removeClass('active-focus');
        $(this).addClass('active-focus');
    });

    panels.mouseleave(function(){
        panels.removeClass('active-focus');

    });
  });


  ko.bindingHandlers.toggle = {
      'after': ['value', 'attr'],
      'init': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
          // This updates the model selection array when the DOM element is clicked
          function updateModel() {
              
              //supporting both binding to boolean property and arrays
              if (isValueArray) {
                  var index = ko.utils.arrayIndexOf(underlyingValue, viewModel);
                  if(index > -1){
                      underlyingValue.splice(index, 1);
                  }else{
                      underlyingValue.push(viewModel);
                  }                
                  if(isObservable){
                      modelProperty.valueHasMutated();
                  }
              } else {
                  if(isObservable && isWritable){
                      //flip the true/false value of an observable
                      modelProperty(!modelProperty());
                  }else{
                      //flip the true/false value of a property
                      viewModel[modelProperty] = !viewModel[modelProperty];
                  }
              }
          };

          var modelProperty = valueAccessor();
          var underlyingValue = ko.utils.unwrapObservable(modelProperty);
          var isValueArray = underlyingValue instanceof Array;
          var isObservable = ko.isObservable(modelProperty);
          var isWritable = ko.isWriteableObservable(modelProperty);

          // Set up a computed to update the binding:
          ko.utils.registerEventHandler(element, "click", updateModel);
      }
  };



 


  var panelVisibleToggle = function(data,event){
    var target = data + ' .collapsable-panel';
    $(target).toggle();
  };  
  var panelHide = function(data, event){
    $(event.currentTarget).parents('.collapsable-panel').hide();
    $(event.currentTarget).parents('.selected').removeClass('selected');
  };
  var panelShow = function(data,event){
    var target = data + ' .collapsable-panel'
    $(target).show();
  };

  var listchange = function(data, event){
    var hash = location.hash;
    $('.split-sidebar .nav-list li').each(function(){
      var that = $(this);
      that[ $('a', this).attr( 'href' ) === hash ? 'addClass' : 'removeClass' ]( 'selected' );
      }
    );
  };


