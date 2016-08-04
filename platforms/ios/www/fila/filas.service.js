(function() {
    'use strict';
    angular
        .module('filas.service', [])
        .factory('FilasService', FilasService);

    FilasService.$inject = ['$http', '$q'];
    function FilasService($http, $q) {

      var host = 'http://usjt-savingtime.rhcloud.com/';

        var filasMethods = {
            selectEspera : selectEspera,
            selectAtendimento : selectAtendimento,
            mesasCapacidades : mesasCapacidades,
            selectMesaAtend : selectMesaAtend,
            cancelarCheckin : cancelarCheckin,
            getAllStatusAtend : getAllStatusAtend,
            efetuarCheckout : efetuarCheckout
        };

        return filasMethods;


        function selectEspera() {
          var deferred = $q.defer();
          $http.get(host + 'atendimentorest/fila/espera')
          .success(function(data) {
            deferred.resolve(data);
          }).error(function(data) {
            deferred.reject(data);
          });

          return deferred.promise;
        };


        function selectAtendimento() {
          var deferred = $q.defer();
          $http.get(host + 'atendimentorest/lista/atendimento')
          .success(function(data) {
            deferred.resolve(data);
          }).error(function(data) {
            deferred.reject(data);
          });

          return deferred.promise;
        };

        function mesasCapacidades(capacidade) {
          var deferred = $q.defer();
          $http.get(host + 'mesarest/consultar/mesas/capacidades/' + capacidade)
          .success(function(data) {
            deferred.resolve(data);
          }).error(function(data) {
            deferred.reject(data);
          });

          return deferred.promise;
        };

        function selectMesaAtend(codAtend, codigoMesaAtend) {
          var deferred = $q.defer();
          $http.get(host + 'atendimentorest/iniciar/atendimento/' + codAtend + '/'+codigoMesaAtend)
          .success(function(data) {
            deferred.resolve(data);
          }).error(function(data) {
            deferred.reject(data);
          });

          return deferred.promise;
        };


        function cancelarCheckin(statusEscolhido, codAtend) {
          var deferred = $q.defer();
          $http.get(host + 'atendimentorest/cancelar/checkin/' + codAtend + '/'+statusEscolhido)
          .success(function(data) {
            deferred.resolve(data);
          }).error(function(data) {
            deferred.reject(data);
          });

          return deferred.promise;
        };

        function efetuarCheckout(statusEscolhido, codAtend) {
          var deferred = $q.defer();
          $http.get(host + 'atendimentorest/efetuar/checkout/' + codAtend + '/'+statusEscolhido)
          .success(function(data) {
            deferred.resolve(data);
          }).error(function(data) {
            deferred.reject(data);
          });

          return deferred.promise;
        };



        function getAllStatusAtend() {
          var deferred = $q.defer();
          $http.get(host + 'atendimentorest/get/status/atendimento')
          .success(function(data) {
            deferred.resolve(data);
          }).error(function(data) {
            deferred.reject(data);
          });

          return deferred.promise;
        }





    }
})();