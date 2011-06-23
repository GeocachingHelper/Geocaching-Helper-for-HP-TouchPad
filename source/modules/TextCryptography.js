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
	name: "at.dsteiner.webos.gchelper.modules.TextCryptography",
	kind: enyo.VFlexBox,
	published: {
		title: "Text Cryptography",
		icon: "text_crypto"
	},
	components: [{
		kind: enyo.HFlexBox,
		align: "center",
		components: [{
			content: "Crypto type:",
			style: "font-weight:bold; margin-right:10px;"
		}, {
			name: "cryptoType",
			kind: "RadioGroup",
			flex: 1,
			onclick: "cryptoTypeClick",
			value: "rot13",
			components: [{
				caption: "ROT13",
				value: "rot13"
			}, {
				caption: "Vigenère cipher",
				value: "vigenere"
			}]
		}]
	}, {
		name: "cryptoPane",
		kind: "Pane",
		flex: 1,
		components: [{
			name: "rot13",
			kind: "at.dsteiner.webos.gchelper.modules.textcrypto.ROT13",
			className: "enyo-bg"
		}, {
			name: "vigenere",
			kind: "at.dsteiner.webos.gchelper.modules.textcrypto.Vigenere",
			className: "enyo-bg",
			lazy: true
		}]
	// TODO: think about how to place the help
	}],
	cryptoTypeClick: function(inSender) {
		this.$.cryptoPane.selectViewByName(inSender.getValue());
	},
	clearInput: function() {
		this.$.cryptoPane.getView().clearInput();
	}
});