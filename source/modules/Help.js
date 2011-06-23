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
	name: "at.dsteiner.webos.gchelper.modules.Help",
	kind: "DividerDrawer",
	caption: "Help",
	open: false,
	components: [{
		kind: "VirtualRepeater",
		onSetupRow: "setupRow",
		components: [{
			kind: "Item",
			layoutKind: "HFlexLayout",
			components: [{
				name: "title",
				style: "font-weight:bold; margin-right:10px;"
			}, {
				name: "content",
				flex: 1,
				allowHtml: true
			}]
		}]
	}],
	setupRow: function(inSource, inIndex) {
		var r = this.help[inIndex];
		if (r) {
			this.$.title.setContent(r.title + ":");
			this.$.content.setContent(r.content);
			return true;
		}
	}
});