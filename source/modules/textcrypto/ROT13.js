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
	name: "at.dsteiner.webos.gchelper.modules.textcrypto.ROT13",
	kind: enyo.VFlexBox,
	components: [{
		kind: enyo.HFlexBox,
		components: [{
			content: "Input text:",
			flex: 1,
			style: "font-weight:bold;margin-right:10px;"
		}, {
			content: "Result text:",
			flex: 1,
			style: "font-weight:bold;"
		}],
		style: "margin-bottom:15px;"
	}, {
		kind: enyo.HFlexBox,
		components: [{
			name: "input",
			kind: "RichText",
			flex: 1,
			richContent: false,
			style: "margin-right:10px;",
			oninput: "compute"
		}, {
			name: "result",
			kind: "RichText",
			flex: 1,
			disabled: true,
			hint: "-"
		}]
	}],
	compute: function(inSender) {
		var input = this.$.input.getValue();
		var result = "";
		for ( var i = 0; i < input.length; ++i) {
			var c = input[i];
			var cVal = c.charCodeAt(0);
			if ((c >= 'a' && c <= 'm') || (c >= 'A' && c <= 'M')) {
				cVal += 13;
			} else if ((c >= 'n' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
				cVal -= 13;
			}
			result += String.fromCharCode(cVal);
		}
		this.$.result.setValue(result);
	},
	clearInput: function() {
		this.$.input.setValue("");
		this.compute();
	}
});