
<template>
  <div v-if="tests">
    <b-table :items="testItems" :fields="testFields">

      <template v-slot:cell(more)="row">
        <button class="btn btn-outline-secondary btn-sm" @click="row.toggleDetails">
          <i v-if="row.detailsShowing" class="fa fa-chevron-circle-up"/>
          <i v-else class="fa fa-chevron-circle-down"/>
        </button>
      </template>

      <template v-slot:row-details="row">

        <stacked-field-table :object=testDetails(row.item) label="Test details" :open="true"/>

        <b-table table-variant="light" striped v-if="row.item.issues.length>0" :items="issuesDetails(row.item.issues)"/>

      </template>

    </b-table>
  </div>
</template>

<script>

import StackedFieldTable from "../StackedFieldTable.vue";

export default {

  name: "QAResults",

  components: {
    StackedFieldTable
  },

  props: {
    tests: Array
  },

  data() {
    return {
      testFields: [
        { key: "id", sortable: true },
        { key: "severity", sortable: true },
        { key: "count", sortable: true },
        { key: "component", sortable: true },
        { key: "field", sortable: true },
        { key: "rule", sortable: true },
        { key: "ran", sortable: true },
        { key: "timeElapsedMs", label: "MS", sortable: true },
        { key: "more" }
      ]

    }
  },

  computed: {

    testItems() {
      return this.tests.map( test => {

        let _rowVariant = "secondary";
        if (test.passed) _rowVariant = "success";
        if (test.failed && test.severity == "error") _rowVariant = "danger";
        if (test.failed && test.severity == "warning") _rowVariant = "warning";
        if (test.failed && test.severity == "info") _rowVariant = "info";

        return {
          ...test,
          count: test.issues.length,
          _rowVariant
        }
      })
      .sort( (a, b) => {
        if (a.count != b.count) {
          return (a.count > b.count) ? -1 : 1;
        }
        if (a.ran != b.ran) {
          return (a.ran) ? -1 : 1;
        }
        return (a.id < b.id) ? -1 : 1;
      })
    }

  },

  methods: {

    testDetails(test) {
      return {
        description: test.description,
        category: test.category,
        scope: test.scope,
        ms: test.timeElapsedMilliseconds,
        exceptions: test.exceptions,
        exceptionLabels: test.exceptionLabels,
        validExample: test.validExample,
        invalidExample: test.invalidExample
      }

    },

    issueDetails(issue) {
      return {
        prefix: issue.prefix,
        label: issue.label,
        problemValue: issue.problemValue,
        comments: issue.comments
      }
    },

    issuesDetails(issues) {
      return issues.map( issue => this.issueDetails(issue) );
    }

  }

}

</script>