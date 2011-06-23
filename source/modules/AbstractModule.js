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
	name: "at.dsteiner.webos.gchelper.modules.AbstractModule",
	kind: enyo.VFlexBox,
	create: function() {
		this.inherited(arguments);
	},
	published: {
		module: ""
	},
	events: {
		onBack: ""
	},
	components: [{
		name: "pageHeader",
		kind: "PageHeader",
		components: [{
			name: "moduleIcon",
			kind: "Image",
			style: "margin-right:10px;"
		}, {
			name: "moduleTitle",
			kind: enyo.VFlexBox,
			flex: 1
		}, {
			kind: "IconButton",
			icon: "images/ic_clear.png",
			content: "clear input",
			onclick: "clearInput",
			style: "margin-right:10px;"
		}, {
			name: "backButton",
			kind: "IconButton",
			icon: "images/ic_back.png",
			content: "back",
			onclick: "goBack",
			style: "margin-right:10px;"
		}]
	}, {
		name: "moduleBody",
		kind: "Pane",
		flex: 1,
		style: "margin:10px;",
		components: [{
			name: "textCryptography",
			className: "enyo-bg",
			kind: "at.dsteiner.webos.gchelper.modules.TextCryptography",
			lazy: true
		}, {
			name: "textCalculation",
			className: "enyo-bg",
			kind: "at.dsteiner.webos.gchelper.modules.TextCalculation",
			lazy: true
		}, {
			name: "romanNumbers",
			className: "enyo-bg",
			kind: "at.dsteiner.webos.gchelper.modules.RomanNumbers",
			lazy: true
		}, {
			name: "convertCoordinates",
			className: "enyo-bg",
			kind: "at.dsteiner.webos.gchelper.modules.ConvertCoordinates",
			lazy: true
		}]
	}],
	moduleChanged: function(inOldValue) {
		this.$.moduleBody.selectViewByName(this.module);
		var module = this.$[this.module];
		this.$.moduleTitle.setContent(module.getTitle());
		this.$.moduleIcon.setSrc("images/ic_" + module.getIcon() + ".png");
	},
	goBack: function(inSender) {
		this.doBack();
	},
	clearInput: function(inSender) {
		this.$[this.module].clearInput();
	}
});