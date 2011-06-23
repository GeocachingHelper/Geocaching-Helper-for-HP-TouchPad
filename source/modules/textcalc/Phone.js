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
	name: "at.dsteiner.webos.gchelper.modules.textcalc.Phone",
	kind: "at.dsteiner.webos.gchelper.modules.textcalc.AbstractMode",
	compute: function(input) {
		this.charCount = input.length;
		this.charValueSum = 0;
		this.digitSum = 0;

		for ( var i = 0; i < input.length; ++i) {
			var c = input[i];
			var cVal = null;
			if (c >= 'A' && c <= 'Z') {
				cVal = c.charCodeAt(0) - 'A'.charCodeAt(0);
			} else if (c >= 'a' && c <= 'z') {
				cVal = c.charCodeAt(0) - 'a'.charCodeAt(0);
			}
			if (cVal != null) {
				cVal = parseInt(cVal / 3) + 2;
				if (c == 'S' || c == 's' || c == 'V' || c == 'v' || c == 'Y'
						|| c == 'y' || c == 'Z' || c == 'z') {
					--cVal;
				}
				this.charValueSum += cVal;
				this.digitSum += this.calculateDigitSum(cVal);
			}
			if (c >= '0' && c <= '9') {
				this.charValueSum += c.charCodeAt(0) - '0'.charCodeAt(0);
				this.digitSum += this.calculateDigitSum(c.charCodeAt(0)
						- '0'.charCodeAt(0));
			}
		}
		this.reducedDigitSum = this.calculateDigitSum(this.digitSum, true);
	}
});