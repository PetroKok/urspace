<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->integer('user_id')->unsigned();
            $table->string('name');
            $table->string('type');
            $table->string('src');
            $table->string('size');
            $table->timestamps();
        });

//        Schema::table('files', function (Blueprint $table) {
//            $table->foreign('user_id')
//                ->references('id')->on('users')
//                ->onDelete('cascade');
//        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
        Schema::table('files', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
    }
}
