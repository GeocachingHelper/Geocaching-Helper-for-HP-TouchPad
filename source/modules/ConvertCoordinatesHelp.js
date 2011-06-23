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
			name: "at.dsteiner.webos.gchelper.modules.ConvertCoordinatesHelp",
			kind: "at.dsteiner.webos.gchelper.modules.Help",
			help: [
					{
						title: "Formats",
						content: "<b>DMS</b>: N 47° 14' 7\"<br/><b>MinDec</b>: N 47° 14.123<br/><b>DecimalDegree</b>: N 47.23538"
					},
					{
						title: "Input formats",
						content: "You can use any of the formats above to enter coordinates. All special character (°, ' or \") can and should be omitted. Latitude and longitude can have different input formats."
					}]
		});