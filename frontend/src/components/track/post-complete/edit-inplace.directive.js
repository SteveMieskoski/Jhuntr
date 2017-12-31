export function EditInPlace() {
        return {
            restrict: 'A',
            scope: { value: '=editInPlace', onSaveFn: '&onSave', onCancelFn: '&onCancel' },
            template: '<span ng-click="handleClick()" ng-bind="value"></span><input ng-model="modelCopy" style="width:100%;"></input>',
            link: function ( $scope, element /* , attrs */ ) {
                // Let's get a reference to the input element, as we'll want to reference it.
                var inputChild = angular.element( element.children()[1] ),
                    previousValue;

                element.addClass( 'edit-in-place' );
                $scope.editing = false;

                // This directive edits a copy of the value. Important because if the
                // value is included in a sorted list, then the sorting will be active
                // during editing, which can cause UI surprises. Elements get sorted out
                // from under the cursor and can lose focus. So we edit a copy of the
                // value, and the actual model gets updated by the controller who
                // receives the onSaveFn.
                $scope.modelCopy = $scope.value;

                $scope.handleClick = function() {
                    if ( ! $scope.editing) {
                        $scope.beginEdit();
                    }
                };

                // why do I need to watch scope.editing ?
                // $scope.$watch( 'editing', function () {
                //   console.log('editInPlace editing changed', $scope.editing);
                //   if ( $scope.editing ) {
                //     $scope.edit();
                //   }
                //   else {
                //     $scope.stop();
                //   }
                // });

                // activate editing mode
                $scope.beginEdit = function () {
                    $scope.editing = true;
                    previousValue = $scope.value;

                    // When the css class is 'active', the input box gets displayed.
                    // See the css for details.
                    element.addClass( 'active' );

                    // Now, focus the element.
                    // `angular.element()` returns a chainable array, like jQuery. To access
                    // a native DOM function, reference the first element in the array.
                    inputChild[0].focus();
                };

                // When the user leaves the input box, stop editing and accept the changes
                inputChild.prop( 'onblur', function() {
                    if ( $scope.editing ) {
                        $scope.acceptEdits();
                    }
                });

                // has the user pressed the RETURN or ESCAPE key from within the input box?
                inputChild.prop( 'onkeyup', function(e) {
                    if ($scope.editing) {
                        if (e.keyCode === 13) {
                            $scope.acceptEdits();
                        }
                        else if (e.keyCode === 27) {
                            $scope.cancelEdits();
                        }
                    }
                });

                // Accept edits
                $scope.acceptEdits = function () {
                    if ($scope.editing) {
                        $scope.editing = false;
                        element.removeClass( 'active' );
                        if ($scope.modelCopy !== previousValue) {
                            // This directive does not update the model directly. It's up to
                            // the controller to "accept" the changes and apply them to the
                            // original model.
                            $scope.onSaveFn({value: $scope.modelCopy, previousValue: previousValue});
                        }
                    }
                };

                // Cancel edits
                $scope.cancelEdits = function () {
                    if ($scope.editing) {
                        $scope.editing = false;
                        element.removeClass( 'active' );
                        // wrap this assignment so that the view gets updated
                        $scope.$apply(function() {
                            $scope.value = previousValue;
                        });
                        $scope.onCancelFn({value: $scope.value});
                    }
                };
            }
        };
    }

   /* return {
        restrict: 'A',
        scope: {
            value: '<',
            result: '&'
        },
        transclude: true,
        template: `<p ng-if="!editing"  ng-click="handleClick()" >
                  <span ng-transclude></span>
                  {{value}}
                  </p>
                  <p ng-if="editing">
                  <span ng-transclude></span>
                  <input  ng-model="value">
                  <button ng-click="save()">save</button>
                  <button ng-click="cancel()">cancel</button>
                  </p>`,
        link: function ($scope, element, attrs) {
            $scope.doEdit = false;
            console.log(window.angular.element(element));
            // Let's get a reference to the input element, as we'll want to reference it.
            var inputElement = window.angular.element(element.children()[1]);
            var previousValue;
            $scope.editing = false;
            $scope.handleClick = function() {
                if ( ! $scope.editing) {
                    $scope.beginEdit();
                }
            };

            $scope.beginEdit = function () {
                $scope.editing = true;
               // previousValue = $scope.value;
                console.log('element clicked');
                // When the css class is 'active', the input box gets displayed.
                // See the css for details.
                element.addClass( 'active' );

                // Now, focus the element.
                // `angular.element()` returns a chainable array, like jQuery. To access
                // a native DOM function, reference the first element in the array.
              //  inputElement[0].focus();
            };

            $scope.save = function(){
                console.log('save clicked');
                $scope.result($scope.value);
            }
            $scope.cancel = function(){
                console.log('cancel clicked');
                $scope.editing = false;
            }
            // When we leave the input, we're done editing.
            element.prop('onblur', () => {
                $scope.editing = false;
                element.removeClass('active');
            });

        }
    };
}

*/