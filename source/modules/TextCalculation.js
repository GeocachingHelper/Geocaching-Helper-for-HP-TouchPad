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
	name: "at.dsteiner.webos.gchelper.modules.TextCalculation",
	kind: enyo.VFlexBox,
	published: {
		title: "Text Calculation",
		icon: "text_calc"
	},
	resultData: [{
		name: "Character count (spaces included)",
		value: 0
	}, {
		name: "Sum of character values (for alphanumeric characters)",
		value: 0
	}, {
		name: "Sum of digits (for alphanumeric characters)",
		value: 0
	}, {
		name: "Reduced sum of digits (for alphanumeric characters)",
		value: 0
	}],
	components: [{
		kind: enyo.HFlexBox,
		components: [{
			content: "Input:",
			flex: 2,
			style: "font-weight:bold; margin-right:10px;"
		}, {
			content: "Result type:",
			flex: 1,
			style: "font-weight:bold;"
		}]
	}, {
		kind: enyo.HFlexBox,
		components: [{
			name: "textInput",
			kind: "Input",
			hint: "Text input",
			oninput: "onTextInput",
			flex: 2,
			style: "margin-right:10px;"
		}, {
			name: "resultType",
			kind: "RadioGroup",
			flex: 1,
			onclick: "resultTypeClick",
			value: "A1",
			components: [{
				caption: "a = 1",
				value: "A1"
			}, {
				caption: "a = 26",
				value: "A26"
			}, {
				caption: "phone",
				value: "Phone"
			}]
		}],
		style: "margin-bottom:15px;"
	}, {
		content: "Result:",
		style: "font-weight:bold;"
	}, {
		name: "resultList",
		kind: "VirtualRepeater",
		style: "margin-bottom:10px;",
		onSetupRow: "getResultItems",
		components: [{
			kind: "Item",
			layoutKind: "HFlexLayout",
			align: "center",
			components: [{
				name: "resultName",
				flex: 1
			}, {
				name: "resultValue"
			}]
		}]
	}, {
		kind: "at.dsteiner.webos.gchelper.modules.TextCalculationHelp"
	}],
	getResultItems: function(inSender, inIndex) {
		var result = this.resultData[inIndex];
		if (result) {
			this.$.resultName.setContent(result.name);
			this.$.resultValue.setContent(result.value);
			return true;
		}
	},
	onTextInput: function(inSender, inEvent) {
		this.computeResults();
	},
	calculator: null,
	resultTypeClick: function(inSender, inEvent) {
		var kind = "at.dsteiner.webos.gchelper.modules.textcalc."
				+ inSender.getValue();
		this.calculator = enyo.create({
			kind: kind
		});
		this.computeResults();
	},
	computeResults: function() {
		if (this.calculator == null) {
			this.calculator = enyo.create({
				kind: "at.dsteiner.webos.gchelper.modules.textcalc."
						+ this.$.resultType.getValue()
			})
		}
		var input = this.$.textInput.getValue();
		this.calculator.compute(input);
		this.resultData[0].value = this.calculator.charCount;
		this.resultData[1].value = this.calculator.charValueSum;
		this.resultData[2].value = this.calculator.digitSum;
		this.resultData[3].value = this.calculator.reducedDigitSum;
		this.$.resultList.render();
	},
	clearInput: function() {
		this.$.textInput.setValue("");
		this.computeResults();
	}
});
