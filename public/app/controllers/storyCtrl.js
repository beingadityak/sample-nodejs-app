angular.module('storyCtrl',['StoryService'])

		.controller('StoryController',function(Story, socketio) {
			
			var vm = this;

			Story.allStory()
				 .success(function(data){
				 	vm.stories = data;
				 });

			vm.createStory = function(){
				vm.message = '';
				Story.create(vm.storyData)
					 .success(function(data){
					 	//clear up form
					 	vm.storyData = '';
					 	vm.message = data.message;
					 });
			};

			socketio.on('story', function(data){
				vm.stories.push(data);
			});

		})

		.controller('AllStoriesController',function(stories,socketio){
			var vm = this;
			vm.stories = stories.data;
			socketio.on('story', function(data){
				vm.stories.push(data);
			});

		});