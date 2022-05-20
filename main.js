var app = new Vue({
  el: '#app',
  data: {
    loanAmount: 250000,
    repaymentYears: 14,
    // Same purpose data could be reduced by implementing components.
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
        // Added hint message here in case of future localization.
        loanAmountHintMessage: 'Måste vara mellan 5000 och 600 000 kr.',
        repaymentYearsHintMessage: 'Måste vara mellan 1 och 15 år.',
      };
    },

    add(target) {
      // If statement could be reduced if placed within a component covering the entire input row.
      // This would however imply unnecessary complexity for the objective at hand.
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
      // If statement duplicate code could be refactored with components.
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
    // The calculateMonthlyCost function included.
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
    // Handle variables changes and prevent the user from entering invalid values i.e. out of range.
    loanAmount: {
      // Deep watcher used to access variable before mutation to rollback if outside of range.
      handler(newVal, oldVal) {
        if (newVal < 5000 || newVal > 600000) {
          // In order to handle default input output, parseInt() is used to convert string to an integer.
          this.loanAmount = parseInt(oldVal);
        } else {
          this.loanAmount = parseInt(newVal);
        }
      },
      deep: true,
    },
    // Duplicate of above. Could be refactored with components.
    repaymentYears: {
      handler(newVal, oldVal) {
        if (newVal < 1 || newVal > 15) {
          this.repaymentYears = parseInt(oldVal);
        } else {
          this.repaymentYears = parseInt(newVal);
        }
      },
      deep: true,
    },
  },
  filters: {
    // Formats all numbers to xxx, x xxx, xx xxx, xxx xxx, etc.
    formatNumber: function (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
  },
});
