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
enyo.kind({
	name: "at.dsteiner.webos.gchelper.modules.ConvertCoordinates",
	kind: enyo.VFlexBox,
	create: function() {
		this.inherited(arguments);
		this.converter = enyo.create({
			kind: "at.dsteiner.webos.gchelper.modules.CoordinateConverter"
		});
	},
	published: {
		title: "Convert Coordinates",
		icon: "convert_coords"
	},
	components: [{
		kind: enyo.HFlexBox,
		align: "center",
		style: "margin-bottom:10px;",
		components: [{
			content: "Latitude:",
			style: "font-weight:bold; margin-right:10px;"
		}, {
			name: "inputLatitude",
			kind: "Input",
			flex: 1,
			oninput: "inputChanged",
			style: "margin-right:10px;"
		}, {
			content: "Longitude:",
			style: "font-weight:bold; margin-right:10px;"
		}, {
			name: "inputLongitude",
			kind: "Input",
			flex: 1,
			oninput: "inputChanged"
		}]
	}, {
		kind: enyo.HFlexBox,
		align: "top",
		style: "margin-bottom:10px;",
		components: [{
			content: "Result:",
			style: "font-weight:bold; margin-right:10px;"
		}, {
			name: "resultList",
			kind: "VirtualRepeater",
			flex: 1,
			style: "margin-bottom:10px;",
			onSetupRow: "getResultItems",
			components: [{
				kind: "Item",
				layoutKind: "HFlexLayout",
				align: "center",
				components: [{
					name: "resultType",
					style: "width:150px; font-weight:bold; margin-right:10px;"
				}, {
					name: "resultLatitude",
					kind: "Input",
					disabled: true,
					hint: "-",
					flex: 1
				}, {
					name: "resultLongitude",
					kind: "Input",
					disabled: true,
					hint: "-",
					flex: 1
				}]
			}]
		}]
	}, {
		kind: "at.dsteiner.webos.gchelper.modules.ConvertCoordinatesHelp"
	}],
	result: [],
	getResultItems: function(inSource, inIndex) {
		var r = this.result[inIndex];
		if (r) {
			this.$.resultType.setContent(r.type + ":");
			this.$.resultLatitude.setValue(r.latitude);
			this.$.resultLongitude.setValue(r.longitude);
			return true;
		}
	},
	inputChanged: function(inSource) {
		this.calculate();
	},
	converter: null,
	calculate: function() {
		var latLng = this.converter.toLatLng(this.$.inputLatitude.getValue(),
				this.$.inputLongitude.getValue());
		this.result = this.converter.convert(latLng);
		this.$.resultList.render();
	},
	clearInput: function() {
		this.$.inputLatitude.setValue("");
		this.$.inputLongitude.setValue("");
		this.inputChanged();
	}
});
