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
	name: "at.dsteiner.webos.gchelper.modules.RomanNumbers",
	kind: enyo.VFlexBox,
	published: {
		title: "Roman Numbers",
		icon: "roman_numbers"
	},
	components: [{
		kind: enyo.HFlexBox,
		align: "center",
		style: "margin-bottom:10px;",
		components: [{
			content: "Input:",
			style: "font-weight:bold; margin-right:10px;"
		}, {
			name: "input",
			kind: "Input",
			flex: 1,
			oninput: "inputChanged"
		}]
	}, {
		kind: enyo.HFlexBox,
		align: "center",
		style: "margin-bottom:10px;",
		components: [{
			name: "modeType",
			kind: "RadioGroup",
			flex: 1,
			onclick: "inputChanged",
			value: "r-n",
			components: [{
				caption: "Roman -> Numeral",
				value: "r-n"
			}, {
				caption: "Numeral -> Roman",
				value: "n-r"
			}]
		}]
	}, {
		kind: enyo.HFlexBox,
		align: "center",
		style: "margin-bottom:10px;",
		components: [{
			content: "Result:",
			style: "font-weight:bold; margin-right:10px;"
		}, {
			name: "result",
			kind: "Input",
			hint: "-",
			disabled: true,
			flex: 1
		}]
	}, {
		kind: enyo.HFlexBox,
		align: "center",
		style: "margin-bottom:10px;",
		components: [{
			content: "Strict mode:",
			style: "font-weight:bold; margin-right:10px;"
		}, {
			name: "strictMode",
			kind: "CheckBox",
			checked: true,
			onChange: "inputChanged"
		}]
	}, {
		kind: "at.dsteiner.webos.gchelper.modules.RomanNumbersHelp"
	}],
	numbers: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
	letters: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV",
			"I"],
	inputChanged: function(inSource) {
		this.compute();
	},
	compute: function() {

		if (this.$.modeType.getValue() == "r-n") {
			this.$.result.setValue(this.romanToNumeral(this.$.input.getValue()
					.toUpperCase()));
		} else {
			this.$.result
					.setValue(this.numeralToRoman(this.$.input.getValue()));
		}
	},
	romanToNumeral: function(roman) {
		if (roman == null || roman.length == 0) {
			return "";
		} else if (this.$.strictMode.getChecked()
				&& !/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i
						.test(roman)) {
			return "The given input is not a valid roman numeral.";
		}

		var i = 0;
		var arabic = 0;
		while (i < roman.length) {
			var letter = roman[i];
			var number = this.letterToNumber(letter);

			if (number < 0) {
				return "Roman numerals can't contain the character " + letter
						+ ".";
			}
			++i;

			if (i == roman.length) {
				arabic += number;
			} else {
				var nextNumber = this.letterToNumber(roman[i]);
				if (nextNumber > number) {
					arabic += (nextNumber - number);
					++i;
				} else {
					arabic += number;
				}
			}
		}

		if (arabic > 3999) {
			return "Roman numerals can't be bigger than MMMCMXCIX (3999).";
		}
		return arabic;
	},
	numeralToRoman: function(number) {
		if (number == null || number.length == 0) {
			return "";
		}

		var roman = "";
		var N = parseInt(number);
		if (!N) {
			return "Your input is not a valid number.";
		} else if (N > 3999) {
			return "Roman numerals can't be bigger than 3999.";
		} else if (N < 1) {
			return "Roman numerals can't be less than 1.";
		}
		for ( var i = 0; i < this.numbers.length; ++i) {
			while (N >= this.numbers[i]) {
				roman += this.letters[i];
				N -= this.numbers[i];
			}
		}
		return roman;
	},
	letterToNumber: function(letter) {
		switch (letter) {
		case 'I':
			return 1;
		case 'V':
			return 5;
		case 'X':
			return 10;
		case 'L':
			return 50;
		case 'C':
			return 100;
		case 'D':
			return 500;
		case 'M':
			return 1000;
		default:
			return -1;
		}
	},
	clearInput: function() {
		this.$.input.setValue("");
		this.inputChanged();
	}
});