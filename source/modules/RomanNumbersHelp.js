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
			name: "at.dsteiner.webos.gchelper.modules.RomanNumbersHelp",
			kind: "at.dsteiner.webos.gchelper.modules.Help",
			help: [
					{
						title: "Valid roman symbols",
						content: "Roman numerals only contain the following characters. Inside the parentheses are the numerals values:<br/>I (1), V (5), X (10), L (50), C (100), D (500), M (1000)"
					},
					{
						title: "Combining symbols",
						content: "Numbers are formed by combining symbols together and adding the values. Symbols are placed in order of value, starting with the largest values. When smaller values precede larger values, the smaller values are subtracted from the larger values, and the result is added to the total."
					},
					{
						title: "Examples",
						content: "MMVI is 1000 + 1000 + 5 + 1 = 2006<br/>MCMXLIV = 1000 + (1000 - 100) + (50 - 10) + (5 - 1) = 1944"
					},
					{
						title: "Find out more",
						content: "<a href=\"http:\/\/en.wikipedia.org/wiki/Roman_numerals\">Roman numerals on Wikipedia</a>"
					},
					{
						title: "Strict mode",
						content: "Strict mode enforces the order of the symbols, starting with the largest values. Substracting smaller values is okey though."
					}]
		});