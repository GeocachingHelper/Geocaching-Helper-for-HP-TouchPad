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
	name: "at.dsteiner.webos.gchelper.modules.textcalc.A26",
	kind: "at.dsteiner.webos.gchelper.modules.textcalc.AbstractMode",
	compute: function(input) {
		this.charCount = input.length;
		this.charValueSum = 0;
		this.digitSum = 0;

		for ( var i = 0; i < input.length; ++i) {
			var c = input[i];
			var cVal;
			if (c >= 'A' && c <= 'Z') {
				cVal = -c.charCodeAt(0) + 'Z'.charCodeAt(0) + 1;
				this.charValueSum += cVal;
				this.digitSum += this.calculateDigitSum(cVal);
			} else if (c >= 'a' && c <= 'z') {
				cVal = -c.charCodeAt(0) + 'z'.charCodeAt(0) + 1;
				this.charValueSum += cVal;
				this.digitSum += this.calculateDigitSum(cVal);
			} else if (c >= '0' && c <= '9') {
				cVal = c.charCodeAt(0) - '0'.charCodeAt(0);
				this.charValueSum += cVal;
				this.digitSum += this.calculateDigitSum(cVal);
			}
		}
		this.reducedDigitSum = this.calculateDigitSum(this.digitSum, true);
	}
});