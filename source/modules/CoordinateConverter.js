/**
 * Geocaching Helper for HP TouchPad is a handy utility that helps geocachers solve
 * common problems on their geocaching trips.
 * Copyright (C) 2011  Dustin Steiner
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
enyo
		.kind({
			name: "at.dsteiner.webos.gchelper.modules.CoordinateConverter",
			dmsLatRegExp: /(N|S)\s*(90|[0-8][0-9])(°\s*|\s+)([0-5]?[0-9])('\s*|\s+)([0-5]?[0-9])(\.[0-9]+)?"?/i,
			dmsLonRegExp: /(W|E)\s*(180|1[0-7][0-9]|0?[0-9]{1,2})(°\s*|\s+)([0-5]?[0-9])('\s*|\s+)([0-5]?[0-9])(\.[0-9]+)?"?/i,
			minDecLatRegExp: /(N|S)\s*(90|[0-8][0-9])(°\s*|\s+)([0-5]?[0-9])(\.[0-9]+)?/i,
			minDecLonRegExp: /(W|E)\s*(180|1[0-7][0-9]|0?[0-9]{1,2})(°\s*|\s+)([0-5]?[0-9])(\.[0-9]+)?/i,
			decimalDegreeLatRegExp: /(-|\+)?(90|[0-8][0-9])(\.[0-9]+)?/i,
			decimalDegreeLonRegExp: /(-|\+)?(180|1[0-7][0-9]|0?[0-9]{1,2})(\.[0-9]+)?/i,
			getFromType: function(latitude, longitude) {
				var result = {
					latitude: null,
					longitude: null
				};
				if (this.dmsLatRegExp.test(latitude)) {
					result.latitude = "DMS";
				} else if (this.minDecLatRegExp.test(latitude)) {
					result.latitude = "MinDec";
				} else if (this.decimalDegreeLatRegExp.test(latitude)) {
					result.latitude = "DecimalDegree";
				}
				if (this.dmsLonRegExp.test(longitude)) {
					result.longitude = "DMS";
				} else if (this.minDecLonRegExp.test(longitude)) {
					result.longitude = "MinDec";
				} else if (this.decimalDegreeLonRegExp.test(longitude)) {
					result.longitude = "DecimalDegree";
				}
				return result;
			},
			toLatLng: function(latitude, longitude) {
				var from = this.getFromType(latitude, longitude);

				var latResult = 0.0;
				var latArray = [];
				switch (from.latitude) {
				case "DMS":
					// Index = Result
					// 0 = N|S
					// 1 = Degree
					// 2 = Minutes
					// 3 = Seconds
					// 4 = .Seconds-Fraction
					latArray = latitude.replace(this.dmsLatRegExp,
							"$1&$2&$4&$6&$7").split("&");
					latResult = (parseInt(latArray[1]) + (parseInt(latArray[2]) * 60 + Number(latArray[3]
							+ latArray[4])) / 3600)
							* (latArray[0].toUpperCase() == "N" ? 1 : -1);
					break;
				case "MinDec":
					// Index = Result
					// 0 = N|S
					// 1 = Degree
					// 2 = Minutes
					// 3 =.Seconds
					latArray = latitude.replace(this.minDecLatRegExp,
							"$1&$2&$4&$5").split("&");
					latResult = (parseInt(latArray[1]) + Number(latArray[2]
							+ latArray[3]) / 60)
							* (latArray[0].toUpperCase() == "N" ? 1 : -1);
					break;
				case "DecimalDegree":
					// Index = Result
					// 0 = -, + or nothing
					// 1 = Degree
					// 2 = .Minutes
					latArray = latitude.replace(this.decimalDegreeLatRegExp,
							"$1&$2&$3").split("&");
					latResult = Number(latArray[1] + latArray[2])
							* (latArray[0] == "-" ? -1 : 1);
				}

				var lonResult = 0.0;
				var lonArray = [];
				switch (from.longitude) {
				case "DMS":
					// Index = Result
					// 0 = W|E
					// 1 = Degree
					// 2 = Minutes
					// 3 = Seconds
					// 4 = .Seconds-Fraction
					lonArray = longitude.replace(this.dmsLonRegExp,
							"$1&$2&$4&$6&$7").split("&");
					lonResult = (parseInt(lonArray[1]) + (parseInt(lonArray[2]) * 60 + Number(lonArray[3]
							+ lonArray[4])) / 3600)
							* (lonArray[0].toUpperCase() == "E" ? 1 : -1);
					break;
				case "MinDec":
					// Index = Result
					// 0 = W|E
					// 1 = Degree
					// 2 = Minutes
					// 3 =.Seconds
					lonArray = longitude.replace(this.minDecLonRegExp,
							"$1&$2&$4&$5").split("&");
					lonResult = (parseInt(lonArray[1]) + Number(lonArray[2]
							+ lonArray[3]) / 60)
							* (lonArray[0].toUpperCase() == "E" ? 1 : -1);
					break;
				case "DecimalDegree":
					// Index = Result
					// 0 = -, + or nothing
					// 1 = Degree
					// 2 = .Minutes
					lonArray = longitude.replace(this.decimalDegreeLonRegExp,
							"$1&$2&$3").split("&");
					lonResult = Number(lonArray[1] + lonArray[2])
							* (lonArray[0] == "-" ? -1 : 1);
					break;
				}

				return {
					latitude: latResult,
					longitude: lonResult
				};
			},
			convert: function(from) {
				var result = [];
				if (from == null
						|| (from.latitude == null && from.longitude == null)) {
					return result;
				}

				var latitude = "";
				var longitude = "";
				var degree = 0;

				// DMS:
				latitude = (from.latitude < 0 ? "S " : "N ");
				degree = parseInt(from.latitude) * (from.latitude < 0 ? -1 : 1);
				if (degree < 10) {
					latitude += "0";
				}
				latitude += degree;
				latitude += "° ";
				var mins = ((from.latitude - degree) * 60);
				latitude += parseInt(mins) + "' ";
				latitude += ((mins - parseInt(mins)) * 60).toFixed(0) + "\"";

				longitude = (from.longitude < 0 ? "W " : "E ");
				degree = parseInt(from.longitude)
						* (from.longitude < 0 ? -1 : 1);
				if (degree < 10) {
					longitude += "0";
				}
				longitude += degree;
				longitude += "° ";
				mins = ((from.longitude - degree) * 60);
				longitude += parseInt(mins) + "' ";
				longitude += ((mins - parseInt(mins)) * 60).toFixed(0) + "\"";
				result.push({
					type: "DMS",
					latitude: latitude,
					longitude: longitude
				});

				// MinDec:
				degree = 0;
				latitude = (from.latitude < 0 ? "S " : "N ");
				degree = parseInt(from.latitude) * (from.latitude < 0 ? -1 : 1);
				if (degree < 10) {
					latitude += "0";
				}
				latitude += degree;
				latitude += "° ";
				latitude += ((from.latitude - degree) * 60).toFixed(3);

				longitude = (from.longitude < 0 ? "W " : "E ");
				degree = parseInt(from.longitude)
						* (from.longitude < 0 ? -1 : 1);
				if (degree < 10) {
					longitude += "0";
				}
				longitude += degree;
				longitude += "° ";
				longitude += ((from.longitude - degree) * 60).toFixed(3);
				result.push({
					type: "MinDec",
					latitude: latitude,
					longitude: longitude
				});

				// DecimalDegree:
				latitude = from.latitude.toFixed(5);
				longitude = from.longitude.toFixed(5);
				result.push({
					type: "DecimalDegree",
					latitude: latitude,
					longitude: longitude
				});
				return result;
			}
		});