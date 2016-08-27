(function() {
    'use strict';

    class DatePicker {
        constructor(el, params) {
            this.el = el;
            this.$el = $(document.createElement('div'));
            //Append calendar after input elemnt
            this.el.after(this.$el);

            //default params
            this.params = $.extend({
                type: 'date', // || rangedate
                startDate: moment(), //startDate
                endDate: moment(), //endDate
                locale: 'ru',
                format: 'YYYY-MM-DD', //Display date format
                delimiter: '-', // display visual delimiters for rangedate type picker
                ranges: [], //defualt rasnges is empty
                firstDayOfWeek: 1 //for rus weekday fix)
            }, params);

            moment.locale(this.params.locale);

            //Current view date in calendar
            this.viewStartDate = this.params.startDate;
            this.viewEndDate = this.params.endDate;

            //Selected date - view on top
            this.dateStart = this.params.startDate.clone();
            this.dateEnd = this.params.endDate.clone();

            this.render.call(this);
            
            this.initEvents();
            
            this.setValue();

            return this;
        }
        /**
         * Set active date after click on day in calendar
         * @param {Object} event jquery event
         * @param {String} type  end or start date type
         */
        setActiveDate(event, type = 'start') {
            var el = event.currentTarget,
                dayNum = parseInt(el.innerHTML, 10),
                vd = type === 'start' ? this.viewStartDate : this.viewEndDate;

            if (String(dayNum).length === 1) dayNum = '0' + dayNum;

            var date = moment(vd.format('YYYY MM') + ' ' + dayNum);

            if (type === 'start') {
                if (date.isAfter(this.dateEnd, 'day') && this.params.type === 'rangedate') {
                    this.dateEnd = date;
                } else {
                    this.dateStart = date;
                }
            } else {
                if (date.isBefore(this.dateStart, 'day') && this.params.type === 'rangedate') {
                    this.dateStart = date;
                } else {
                    this.dateEnd = date;
                }
            }
            event.stopPropagation();
            this.render();
            this.setValue();
        }
        /**
         * Set start date
         * @param {Date} date Javascript date object or string date
         */
        setStartDate(date) {
            this.viewStartDate = moment(date);
            this.dateStart = moment(date);
            this.render();
        }
        /**
         * Set end date
         * @param {Date} date Javascript date object or string date
         */
        setEndDate(date) {
            this.viewEndDate = moment(date);
            this.dateEnd = moment(date);
            this.render();
        }
        /**
         * Set next date by params
         * @param  {Object} event    jQuery event
         * @param  {String} calendar end or start type 
         * @param  {String} dateType day or week or month or year
         * @return {void}          
         */
        nextDate(event, calendar = 'start', dateType = 'day') {
            if (calendar === 'start') {
                let newDate = new Date(this.viewStartDate.add(1, dateType).format('YYYY MM DD'));
                this.setStartDate(newDate);
            } else {
                let newDate = new Date(this.viewEndDate.add(1, dateType).format('YYYY MM DD'));
                this.setEndDate(newDate);
            }
            event.stopPropagation();
        }
        /**
         * Set prev date by params
         * @param  {Object} event    jQuery event
         * @param  {String} calendar end or start type 
         * @param  {String} dateType day or week or month or year
         * @return {void}          
         */
        prevDate(event, calendar = 'start', dateType = 'day') {
            if (calendar === 'start') {
                let newDate = new Date(this.viewStartDate.subtract(1, dateType).format('YYYY MM DD'));
                this.setStartDate(newDate);
            } else {
                let newDate = new Date(this.viewEndDate.subtract(1, dateType).format('YYYY MM DD'));
                this.setEndDate(newDate);
            }
            event.stopPropagation();
        }
        /**
         * Set active range date
         * @param {Object} event jQuery event
         */
        setActiveRange(event) {
            var range = parseInt(event.currentTarget.getAttribute('data-range'), 10),
                rangeParam = this.params.ranges[range];
            if (rangeParam) {
                this.dateStart = rangeParam.startDate;
                this.viewStartDate = rangeParam.startDate;
                this.dateEnd = rangeParam.endDate;
                this.viewEndDate = rangeParam.endDate;
                this.render();
            }
        }
        /**
         * Init all events
         */
        initEvents() {
            this.$el.on('click', '.dt__calendar_start .dt__calendar_m_d', event => this.setActiveDate(event, 'start'))
                .on('click', '.dt__calendar_end .dt__calendar_m_d', event => this.setActiveDate(event, 'end'))
                .on('click', '.dt__start .dt__calendar_head_month .next', event => this.nextDate(event, 'start', 'month'))
                .on('click', '.dt__start .dt__calendar_head_month .prev', event => this.prevDate(event, 'start', 'month'))
                .on('click', '.dt__end .dt__calendar_head_month .next', event => this.nextDate(event, 'end', 'month'))
                .on('click', '.dt__end .dt__calendar_head_month .prev', event => this.prevDate(event, 'end', 'month'))
                .on('click', '.dt__start .dt__calendar_head_year .next', event => this.nextDate(event, 'start', 'year'))
                .on('click', '.dt__start .dt__calendar_head_year .prev', event => this.prevDate(event, 'start', 'year'))
                .on('click', '.dt__end .dt__calendar_head_year .next', event => this.nextDate(event, 'end', 'year'))
                .on('click', '.dt__end .dt__calendar_head_year .prev', event => this.prevDate(event, 'end', 'year'))
                .on('click', '.dt__rages_item', event => this.setActiveRange(event))
                .on('click', '.dt__wrapper', event => false);

            this.el.on('click', event => event.stopPropagation())
                .on('focus', event => {
                    this.showCalendar();
                    event.stopPropagation();
                });

            $(document).on('click', event => this.hideCalendar());
        }
        showCalendar() {
            this.$el.addClass('show');
        }
        hideCalendar() {
            this.$el.removeClass('show');
        }
        /**
         * Render month
         * @param  {momentdate} date
         * @param  {type} type start || end 
         * @return {string}  html month template
         */
        renderMonth(date, type = 'start') {
            var html = '',
                daysInMonth = date.daysInMonth(),
                sameDate = type === 'start' ? this.dateStart : this.dateEnd,
                dayClass = '';

            for (var i = 0; i < daysInMonth; i++) {
                let forDate = moment(new Date(date.format('YYYY MM') + ' ' + (i + 1)));

                if (forDate.isSame(this.dateStart, 'day')) {
                    dayClass = 'active';
                } else if (forDate.isSame(this.dateEnd, 'day') && this.params.type === 'rangedate') {
                    dayClass = 'active';
                } else {
                    dayClass = '';
                }

                //Add class for between dates
                if (this.params.type === 'rangedate' && forDate.isAfter(this.dateStart, 'day') && forDate.isBefore(this.dateEnd, 'day')) {
                    dayClass += 'between';
                }
                html += '<div class="dt__calendar_m_d ' + dayClass + '">' + (i + 1) + '</div>';
            };

            return html;
        }
        renderCalendar(date, type = 'start') {
            var html = '',
                navClass = type,
                selectDate = type === 'start' ? this.dateStart : this.dateEnd,
                weekShortDays = moment.weekdaysShort(),
                firstDayOfWeek = date.clone().startOf('month').weekday();

            //FIXME грязный хак для русских) если кто-то найдет вариант элегантнее и быстрее по cpu. Буду рад поправить) 
            if(this.params.firstDayOfWeek === 1) {
                weekShortDays = ['一', '二', '三', '四', '五', '六','七'];
                //Su Mo Tu We Th FrSa
            }

            html += '<div class="dt__calendar dt__' + type + '">';
            html += '<div class="dt__calendar_head">';
            html += '<div class="dt__calendar_head_wday">' + selectDate.format('dddd') + '</div>';
            html += '<div class="dt__calendar_head_month"><span class="prev"><</span>' + selectDate.format('MMMM') + '<span class="next">></span></div>';
            html += '<div class="dt__calendar_head_day">' + selectDate.format('D') + '</div>';
            html += '<div class="dt__calendar_head_year"><span class="prev"><</span>' + selectDate.format('Y') + '<span class="next">></span></div>';
            html += '</div>';
            html += '<div class="dt__calendar_nav">';
            html += '<div class="dt__calendar_nav_title">' + date.format('MMM YYYY') + '</div>';
            html += '</div>';

            html += '<div class="dt__calendar_' + navClass + '"><div class="dt__calendar_m">';
            html += '<div class="dt__calendar_m_w">';
            for (var wi = 0; wi < weekShortDays.length; wi++) {
                html += '<div class="dt__calendar_m_w_n">' + weekShortDays[wi] + '</div>';
            };
            html += '</div>';

            for (var fi = 0; fi < firstDayOfWeek; fi++) {
                html += '<div class="dt__calendar_m_d_e"></div>';
            };

            html += this.renderMonth(date, type);

            html += '</div></div>';
            html += '</div>';

            return html;
        }
        /**
         * Render selector date ranges
         * @return {html} template rangesitem
         */
        renderRanges() {
            var html = '',
                ranges = this.params.ranges;

            html += '<div class="dt__rages">';
            for (let i = 0, l = ranges.length; i < l; i++) {
                html += '<div class="dt__rages_item" data-range="' + i + '"">' + ranges[i].label + '</div>';
            }
            html += '</div>';
            return html;
        }
        /**
         * Render calendar
         * @return {String} html template
         */
        render() {
            var html = '';

            html += '<div class="dt__wrapper">';

            html += this.renderCalendar(this.viewStartDate, 'start');

            if (this.params.type === 'rangedate') {
                html += this.renderCalendar(this.viewEndDate, 'end');

                if (this.params.ranges.length) {
                    html += this.renderRanges();
                }
            }

            html += '</div>';
            this.$el.html(html);

            //afer render
            this.onAfterRender();
        }
        /**
         * Set input value
         */
        setValue() {
            if (this.params.type === 'date') {
                this.el.val(this.dateStart.format(this.params.format));
            } else {
                //range with delimiter
                this.el.val(this.dateStart.format(this.params.format) + this.params.delimiter + this.dateEnd.format(this.params.format));
            }
        }
        onAfterRender() {
            this.$el.addClass('dt');
            if (this.params.type == 'rangedate') {
                this.$el.find('.dt__wrapper').addClass('rangedate');
            }
        }
    }

    //Register for jQuery Plgin
    if (window.jQuery) {
        //Small warpper for jQuery plugin support
        jQuery.fn.DatePicker = function(params) {
            //this === inited plugin element
            return new DatePicker(this, params);
        };
    }

    //Register for requirejs
    if (typeof define === 'function') {
        define('datetimepicker', () => DatePicker);
    }
})();
