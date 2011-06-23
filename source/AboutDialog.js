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
			name: "at.dsteiner.webos.gchelper.AboutDialog",
			kind: "ModalDialog",
			style: "width:50%; min-height:50%;",
			components: [
					{
						content: "About",
						style: "font-weight:bold;"
					},
					{
						layoutKind: "VFlexLayout",
						align: "center",
						components: [
								{
									content: "Geocaching Helper",
									style: "font-weight:bold;"
								},
								{
									content: "Version "
											+ enyo.fetchAppInfo().version
								},
								{
									kind: "Image",
									src: enyo.fetchAppInfo().icon,
									style: "margin:10px;"
								},
								{
									content: "Copyright 2011 by <a href='http://devalopix.blogspot.com'>"
											+ enyo.fetchAppInfo().vendor
											+ "</a>",
									allowHtml: true,
									style: "margin-bottom:10px;"
								},
								{
									layoutKind: "VFlexLayout",
									components: [
											{
												content: "A small app for HP TouchPad that helps geocachers solve several common problems in the field.",
												style: "margin-bottom:10px;"
											}, {
												content: "Icons:",
												style: "font-weight:bold;"
											}, {
												kind: "HtmlContent",
												srcId: "aboutIconsContent",
												onLinkClick: "linkClicked"
											}]
								}, {
									kind: "Button",
									caption: "Close",
									onclick: "closeClick"
								}]
					}],
			linkClicked: function(inSender, inUrl) {
				window.location = inUrl;
			},
			closeClick: function() {
				this.close();
			}
		});