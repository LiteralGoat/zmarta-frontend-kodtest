var app = new Vue({
  el: '#app',
  data: {
    loanAmount: 250000,
    repaymentYears: 14,
    loanAmountHint: false,
    repaymentYearsHint: false,
  },
  methods: {
    /**
     * Simulates an API call to a CMS.
     */
    getContent() {
      return {
        monthlyCostLabel: 'Månadskostnad',
        monthlyCostSuffix: 'kr',
        loanAmountLabel: 'Lånebelopp',
        loanAmountSuffix: 'kr',
        repaymentYearsLabel: 'Återbetalningstid',
        repaymentYearsSuffix: 'år',
        ctaLabel: 'Ansök nu',
        interest: 5.77,
      };
    },

    add(target) {
      if (target === 'loanAmount') {
        this.loanAmount += 5000;
      } else if (target === 'repaymentYears') {
        this.repaymentYears += 1;
      }
    },

    subtract(target) {
      if (target === 'loanAmount') {
        this.loanAmount -= 5000;
      } else if (target === 'repaymentYears') {
        this.repaymentYears -= 1;
      }
    },

    // If the criteria for an error hint is fulfilled, show the error hint.
    hintHandling(e, target) {
      if (target === 'loanAmount') {
        if (e.target.value < 5000 || e.target.value > 600000) {
          this.loanAmountHint = true;
        } else {
          this.loanAmountHint = false;
        }
      } else {
        if (e.target.value < 1 || e.target.value > 15) {
          this.repaymentYearsHint = true;
        } else {
          this.repaymentYearsHint = false;
        }
      }
    },
  },
  computed: {
    // The calculateMonthlyCost function included
    monthlyCost: function () {
      var months = this.repaymentYears * 12;

      return Math.round(
        (this.loanAmount * (this.getContent().interest / 100)) /
          12 /
          (1 - Math.pow(1 + this.getContent().interest / 100 / 12, months * -1))
      );
    },
  },
  watch: {
    loanAmount: {
      handler(newVal, oldVal) {
        if (newVal < 5000 || newVal > 600000) {
          this.loanAmount = oldVal;
        }
      },
      deep: true,
    },
    repaymentYears: {
      handler(newVal, oldVal) {
        if (newVal < 1 || newVal > 15) {
          this.repaymentYears = oldVal;
        }
      },
      deep: true,
    },
  },
  filters: {
    // Formats all numbers to xxx, x xxx, xx xxx, xxx xxx, etc.
    formatNumber: function (value) {
      if (!value) return '';
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
  },
});
