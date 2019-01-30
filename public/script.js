$(document).ready(function($) {
    // $('table').hide();

    $('#selectClass').change(function() {
        var selection = $(this).val();
        $('table')[selection ? 'show' : 'hide']();

        if (selection) {
            $.each($('#weaponsTable tbody tr'), function(index, item) {
                $(item)[$(item).is(':contains(' + selection + ')') ? 'show' : 'hide']();
            });
        }
    });

    $('#selectType').change(function() {
        var selection = $(this).val();
        $('table')[selection ? 'show' : 'hide']();

        if (selection) {
            $.each($('#weaponsTable tbody tr'), function(index, item) {
                $(item)[$(item).is(':contains(' + selection + ')') ? 'show' : 'hide']();
            });
        }
    });

    $('#selectSet').change(function() {
        var selection = $(this).val();
        $('table')[selection ? 'show' : 'hide']();

        if (selection) {
            $.each($('#armorTable tbody tr'), function(index, item) {
                $(item)[$(item).is(':contains(' + selection + ')') ? 'show' : 'hide']();
            });
        }
    });
});