/**
 * Plugin dataTables for date / datetime sort
 *
 *  @name Date (dd . mm[ . YYYY] [ . HH:ii:ss])
 *  @summary Sort dates in the format `dd/mm/YY[YY]` AND datetimes in the format `dd/mm/YY[YY] [H:i:s]`(with optional spaces)
 *  Adapting the date plugin by [Robert Sedovšek] (http://galjot.si/)
 *  @author [Mauricio Schmitz](http://mauricioschmitz.com.br)
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'date-eu', targets: 0 }
 *       ]
 *    } );
 */

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"date-eu-pre": function ( date ) {
		var retorno = 0;
		var datetime = date.split(" ");
		date = datetime[0];
		date = date.replace(" ", "");

		if ( ! date ) {
			return 0;
		}

		var year;
		var eu_date = date.split(/[\.\-\/]/);

		/*year (optional)*/
		if ( eu_date[2] ) {
			year = eu_date[2];
		}
		else {
			year = 0;
		}

		/*month*/
		var month = eu_date[1];
		if ( month.length == 1 ) {
			month = 0+month;
		}

		/*day*/
		var day = eu_date[0];
		if ( day.length == 1 ) {
			day = 0+day;
		}

		retorno = year + month + day;

		/* Hora */
		if (typeof(datetime[1]) != "undefined"){
			datetime[1].replace(" ", "");
			var hour = datetime[1].split(":");

			var hora = 0;
			if (typeof(hour[0]) != "undefined")
				hora = hour[0];

			var minuto = 0;
			if (typeof(hour[1]) != "undefined")
				minuto = hour[1];

			var segundo = 0;
			if (typeof(hour[2]) != "undefined")
				segundo = hour[2];

			retorno += hora + minuto + segundo;

		}
		return (retorno) * 1;
	},

	"date-eu-asc": function ( a, b ) {
		return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	},

	"date-eu-desc": function ( a, b ) {
		return ((a < b) ? 1 : ((a > b) ? -1 : 0));
	}
} );

/**
 *  @name Date (`dd/mm/yyyy`)
 *  @summary Detect data is not null
 *  @author Andy McMaster
 */

jQuery.fn.dataTableExt.aTypes.unshift(
	function ( sData )
	{
		if (sData !== null)// && sData.match(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20|21)\d\d$/)
		{
			return 'date-eu';
		}
		return null;
	}
);