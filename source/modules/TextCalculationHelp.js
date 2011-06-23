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
			name: "at.dsteiner.webos.gchelper.modules.TextCalculationHelp",
			kind: "at.dsteiner.webos.gchelper.modules.Help",
			help: [
					{
						title: "Allowed input",
						content: "All characters (case-insensitive) are allowed as input but only alphanumeric symbols are used for sums."
					},
					{
						title: "Result type phone",
						content: "Matches each character to it's position on a phone's keyboard (A,B,C = 2, D,E,F = 3, ...)"
					},
					{
						title: "Character count",
						content: "Counts the length of the input. All characters count."
					},
					{
						title: "Sum of character values",
						content: "Each character is mapped to a number and those numbers are summed up.<br/>Example: test = 20 + 5 + 19 + 20 = 64"
					},
					{
						title: "(Reduced) sum of digits",
						content: "Characters are mapped to numbers and then the digits are summed up (and reduced to one digit).<br/>Example: test = 20, 5, 19, 20 = 2 + 0 + 5 + 1 + 9 + 2 + 0 = 19 (= 1 + 9 = 10 = 1 + 0 = 1)"
					}]
		});