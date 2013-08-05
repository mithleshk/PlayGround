/**
 * @author Mithlesh
 */

(function($){
	// `Backbone.sync`: Overrides persistence storage with dummy function. This enables use of `Model.destroy()` without raising an error.
	Backbone.sync = function(method,model,success,error){
		success();
	}
	var BBModel = Backbone.Model.extend({
		defaults:{
			'label1':'Button Click',
			'label2':'Count'
		}	
	});
	
	var BBCollect = Backbone.Collection.extend({
		model:BBModel
	});
	
	var ItemView = Backbone.View.extend({
		tagName:"li",
		// `ItemView`s now respond to two clickable actions for each `Item`: swap and delete.
		events:{
			"click span.swap":'swap',
			"click span.delete":'remove'
		},
		// `initialize()` now binds model change/removal to the corresponding handlers below.
		initialize:function(){
			_.bindAll(this,'render','unrender'); // every function that uses 'this' as the current object should be in here
			
			this.model.bind('change',this.render);
			this.model.bind('remove',this.unrender);
		},
		 // `render()` now includes two extra `span`s corresponding to the actions swap and delete.
		render:function(){
			$(this.el).html("<span>"+this.model.get('label1')+" "+this.model.get("label2")+"</sapn>&nbsp; &nbsp; <span class='swap' style='font-family:sans-serif; color:blue; cursor:pointer;'>[swap]</span> <span class='delete' style='cursor:pointer; color:red; font-family:sans-serif;'>[delete]</span>");
			return this;// for chainable calls, like .render().el
		},
		// `unrender()`: Makes Model remove itself from the DOM.
		unrender:function(){
			$(this.el).remove();
		},
		// `swap()` will interchange an `Item`'s attributes. When the `.set()` model function is called, the event `change` will be triggered.
		swap:function(){
			var swapped={
				label1:this.model.get('label2'),
				label2:this.model.get('label1')
			}
			this.model.set(swapped);
		},
		// `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
		remove:function(){
			this.model.destroy();
		}
	});
	
	// Because the new features (swap and delete) are intrinsic to each `Item`, there is no need to modify `ListView`.
	var ListView = Backbone.View.extend({
		el:document.getElementsByTagName("body"), // el attaches to existing element
		events:{
			"click button#add ":"addItem"
		},
		initialize:function(){
			_.bindAll(this,'render','addItem');// every function that uses 'this' as the current object should be in here
			
			this.collection = new BBCollect();
			this.collection.bind('add',this.appendItem);// collection event binder
			
			this.counter=0;
			this.render();
		},
		
		render:function(){
			var _base = this;
			
			$(this.el).append("<button id='add'>Add Item</button>")
			$(this.el).append("<ul></ul>"); // Render tags.
			
			_(this.collection.models).each(function(item){// in case collection is not empty
				_base.appendItem(item);
			},this);
		},
		addItem:function(){
			this.counter++;
			
			var model = new BBModel();
			
			model.set({
				label2:model.get("label2")+" "+this.counter// modify item defaults
			});
			this.collection.add(model);
		},
		appendItem:function(model){
			var itemView = new ItemView({
				model:model
			});
			
			$("ul",this.el).append(itemView.render().el);
		}
	});

	var bbView = new ListView();
})(jQuery);
