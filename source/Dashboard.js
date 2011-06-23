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
	name: "at.dsteiner.webos.gchelper.Dashboard",
	kind: enyo.VFlexBox,
	events: {
		onModuleSelect: ""
	},
	moduleData: [{
		label: "Text Cryptography",
		icon: "ic_text_crypto.png",
		module: "textCryptography"
	}, {
		label: "Text Calculation",
		icon: "ic_text_calc.png",
		module: "textCalculation"
	}, {
		label: "Roman Numbers",
		icon: "ic_roman_numbers.png",
		module: "romanNumbers"
	}, {
		label: "Convert Coordinates",
		icon: "ic_convert_coords.png",
		module: "convertCoordinates"
	}],
	components: [{
		kind: "PageHeader",
		components: [{
			kind: "Image",
			src: "icon.png",
			style: "margin-right:10px;"
		}, {
			kind: enyo.VFlexBox,
			content: "Geocaching Helper",
			flex: 1
		}, {
			name: "aboutButton",
			kind: "IconButton",
			icon: "images/ic_about.png",
			content: "about",
			onclick: "showAbout"
		}]
	}, {
		name: "moduls",
		kind: "VirtualRepeater",
		flex: 1,
		onSetupRow: "getModulItems",
		components: [{
			kind: "Item",
			layoutKind: "HFlexLayout",
			align: "center",
			components: [{
				name: "moduleIcon",
				kind: "Image",
				style: "margin-right:10px"
			}, {
				name: "moduleName",
				flex: 1
			}],
			onclick: "moduleItemClick"
		}]
	}, {
		name: "aboutDialog",
		kind: "at.dsteiner.webos.gchelper.AboutDialog"
	}],
	create: function() {
		this.inherited(arguments);
	},
	showAbout: function(inSender) {
		this.$.aboutDialog.openAtCenter();
	},
	getModulItems: function(inSender, inIndex) {
		var r = this.moduleData[inIndex];
		if (r) {
			this.$.moduleIcon.setSrc("images/" + r.icon);
			this.$.moduleName.setContent(r.label);
			return true;
		}
	},
	moduleItemClick: function(inSender, inEvent) {
		var module = this.moduleData[inEvent.rowIndex];
		this.doModuleSelect(module.module);
	}
});