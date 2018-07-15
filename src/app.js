var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.title = 'Upload the CSV File';
  $scope.myStyle = {
	        "color" : "white",
	        "background-color" : "darkblue",
	        "font-size" : "27px",
	        "padding" : "5px"
	    }
  $scope.sortOrder = false;
  $scope.sortData = function(){
    $scope.sortOrder = !$scope.sortOrder;
  }
});

app.directive('fileReader', function() {
  return {
    scope: {
      fileReader:"="
    },
    link: function(scope, element) {
      $(element).on('change', function(changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              var contents = e.target.result;
            var rows = contents.replace(/"/g, '').split(/\n/g);
      var report = [];
      angular.forEach(rows, function(element, index) {
        // No need for header row
        if (index !== 0) {
          var rowData = element.split(/,/g);
          var tempReportData = {
            FirstName: rowData[0].trim(),
            SurName: rowData[1].trim(),
            IssueCount: rowData[2].trim(),
            Dob: rowData[3].trim()
          }
          report.push(tempReportData);
          console.log(report);
        }
      });
              scope.$apply(function () {
                scope.fileReader = report;
                scope.testing = contents;
              });
          };
          
          r.readAsText(files[0]);
        }
      });
    }
  };
});