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
	name: "at.dsteiner.webos.gchelper.modules.textcrypto.Vigenere",
	kind: enyo.HFlexBox,
	components: [{
		kind: enyo.VFlexBox,
		flex: 1,
		style: "margin-right:10px;",
		components: [{
			content: "Cypher key:",
			style: "font-weight:bold;"
		}, {
			name: "cypherKey",
			kind: "Input",
			oninput: "compute",
			style: "margin-bottom:10px;"
		}, {
			content: "Input:",
			style: "font-weight:bold;"
		}, {
			name: "input",
			kind: "RichText",
			richContent: false,
			oninput: "compute"
		}]
	}, {
		kind: enyo.VFlexBox,
		flex: 1,
		components: [{
			content: "Mode:",
			style: "font-weight:bold;"
		}, {
			layoutKind: "HFlexLayout",
			style: "margin-bottom:10px;",
			components: [{
				name: "cryptoMode",
				kind: "RadioGroup",
				flex: 1,
				onclick: "compute",
				value: "de",
				components: [{
					caption: "decrypt",
					value: "de"
				}, {
					caption: "encrypt",
					value: "en"
				}]
			}]
		}, {
			content: "Result:",
			style: "font-weight:bold;"
		}, {
			name: "result",
			kind: "RichText",
			flex: 1,
			disabled: true,
			hint: "-"

		}]
	}],
	compute: function() {
		if (this.$.cryptoMode.getValue() == "en") {
			this.$.result.setValue(this.encrypt(this.$.cypherKey.getValue()
					.toLowerCase(), this.$.input.getValue().toLowerCase()));
		} else {
			this.$.result.setValue(this.decrypt(this.$.cypherKey.getValue()
					.toLowerCase(), this.$.input.getValue().toLowerCase()));
		}
	},
	encrypt: function(secret, input) {
		var maxPosInSecret = secret.length;
		var posInSecret = 0;
		var result = "";
		for ( var i = 0; i < input.length; ++i) {
			var c = input[i];
			var cVal = c.charCodeAt(0);
			if (c >= 'a' && c <= 'z') {
				var secretChar = secret.charCodeAt(posInSecret);
				secretChar -= 'a'.charCodeAt(0);
				cVal += secretChar;
				if (cVal > 'z'.charCodeAt(0)) {
					cVal -= ('z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1);
				}
				result += String.fromCharCode(cVal);
				++posInSecret;
				posInSecret %= maxPosInSecret;
			} else {
				result += String.fromCharCode(cVal);
			}
		}
		return result;
	},
	decrypt: function(secret, input) {
		var maxPosInSecret = secret.length;
		var posInSecret = 0;
		var result = "";
		for ( var i = 0; i < input.length; ++i) {
			var c = input[i];
			var cVal = c.charCodeAt(0);
			if (c >= 'a' && c <= 'z') {
				var secretChar = secret.charCodeAt(posInSecret);
				secretChar -= 'a'.charCodeAt(0);
				cVal -= secretChar;
				if (cVal < 'a'.charCodeAt(0)) {
					cVal += ('z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1);
				}
				result += String.fromCharCode(cVal);
				++posInSecret;
				posInSecret %= maxPosInSecret;
			} else {
				result += String.fromCharCode(cVal);
			}
		}
		return result;
	},
	clearInput: function() {
		this.$.cypherKey.setValue("");
		this.$.input.setValue("");
		this.compute();
	}
});